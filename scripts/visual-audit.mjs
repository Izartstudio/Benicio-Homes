import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";

const chromePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const widths = [1440, 1024, 768, 430, 390, 375, 320];
const baseUrl = process.env.AUDIT_URL ?? "http://127.0.0.1:3000";
const label = process.argv[2] ?? "current";
const route = process.argv[3] ?? "/";
const selectors = (process.argv[4] ??
  '[data-section="contact"],[data-section="footer"]'
).split(",");
const outputDirectory = `/private/tmp/benicio-${label}`;
const port = 9333;

await mkdir(outputDirectory, { recursive: true });

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    "--remote-allow-origins=*",
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getJson(path) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`);
  return response.json();
}

for (let attempt = 0; attempt < 30; attempt += 1) {
  try {
    await getJson("/json/version");
    break;
  } catch {
    await delay(250);
  }
}

const [{ webSocketDebuggerUrl }] = await getJson("/json");
const socket = new WebSocket(webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let messageId = 0;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function send(method, params = {}) {
  messageId += 1;
  socket.send(JSON.stringify({ id: messageId, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(messageId, { resolve, reject });
  });
}

async function evaluate(expression, awaitPromise = false) {
  const { result } = await send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  return result.value;
}

await send("Page.enable");
await send("Runtime.enable");

const results = [];

for (const width of widths) {
  const height = width >= 768 ? 1200 : 1400;
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
  });
  await send("Page.navigate", { url: `${baseUrl}${route}` });
  await delay(3500);
  await evaluate("document.fonts.ready", true);

  const audit = await evaluate(`(() => {
    const hooks = [
      "[data-section]",
      "[data-reveal-id]",
      "[data-contact-container]",
      "[data-contact-card]",
      "[data-footer-content]",
      "[data-footer-brand]",
      "[data-footer-navigation]",
      "[data-footer-legal]",
      "[data-footer-contact]",
      "[data-footer-social]"
    ];
    return {
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      hooks: Object.fromEntries(
        hooks.map((selector) => [selector, document.querySelectorAll(selector).length])
      )
    };
  })()`);

  for (const selector of selectors) {
    const clip = await evaluate(`(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) return null;
      element.scrollIntoView({ block: "start" });
      const rect = element.getBoundingClientRect();
      return {
        x: Math.max(0, rect.left + scrollX),
        y: Math.max(0, rect.top + scrollY),
        width: Math.min(rect.width, document.documentElement.scrollWidth),
        height: rect.height
      };
    })()`);
    await delay(1800);
    if (!clip) continue;
    const { data } = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { ...clip, scale: 1 },
    });
    const safeName = selector.includes("footer") ? "footer" : "contact";
    await Bun.write(
      `${outputDirectory}/${safeName}-${width}.png`,
      Buffer.from(data, "base64"),
    );
  }

  results.push(audit);
}

await Bun.write(
  `${outputDirectory}/audit.json`,
  `${JSON.stringify(results, null, 2)}\n`,
);
socket.close();
chrome.kill("SIGTERM");
console.log(outputDirectory);
