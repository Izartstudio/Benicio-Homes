import { createElement, type ComponentPropsWithRef, type JSX } from "react";
import { cn } from "@/utils/cn";

type NativeTextElement = Extract<
  keyof JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "p" | "span"
>;

export type DifferenceTextProps<T extends NativeTextElement = "span"> = {
  as?: T;
} & Omit<ComponentPropsWithRef<T>, "as">;

export function DifferenceText<T extends NativeTextElement = "span">({
  as,
  className,
  ...props
}: DifferenceTextProps<T>) {
  return createElement(as ?? "span", {
    ...props,
    "data-difference-text": true,
    className: cn("text-benicio-blend mix-blend-difference", className),
  });
}
