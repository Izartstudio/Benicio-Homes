export function isSafariBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return (
    navigator.vendor === "Apple Computer, Inc." &&
    /Safari/i.test(navigator.userAgent) &&
    !/(CriOS|FxiOS|EdgiOS|OPiOS)/i.test(navigator.userAgent)
  );
}
