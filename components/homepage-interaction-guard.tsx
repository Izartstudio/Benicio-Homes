"use client";

import { useEffect, type ReactNode } from "react";

const protectedSelector = "[data-homepage-root], [data-navbar]";
const editableSelector =
  'input, textarea, select, option, [contenteditable="true"]';

function asElement(target: EventTarget | null) {
  return target instanceof Element ? target : null;
}

function isProtectedTarget(event: Event) {
  const target = asElement(event.target);

  if (target?.closest(editableSelector)) {
    return false;
  }

  if (target?.closest(protectedSelector)) {
    return true;
  }

  const selectionNode = window.getSelection()?.anchorNode;
  const selectionElement =
    selectionNode instanceof Element
      ? selectionNode
      : selectionNode?.parentElement;

  return Boolean(selectionElement?.closest(protectedSelector));
}

export function HomepageInteractionGuard({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const preventProtectedAction = (event: Event) => {
      if (isProtectedTarget(event)) {
        event.preventDefault();
      }
    };

    const protectedEvents = [
      "copy",
      "cut",
      "dragstart",
      "paste",
      "selectstart",
    ] as const;

    protectedEvents.forEach((eventName) => {
      document.addEventListener(eventName, preventProtectedAction, true);
    });

    return () => {
      protectedEvents.forEach((eventName) => {
        document.removeEventListener(eventName, preventProtectedAction, true);
      });
    };
  }, []);

  return (
    <main data-homepage-root>
      {children}
    </main>
  );
}
