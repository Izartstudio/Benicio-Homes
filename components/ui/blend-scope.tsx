import { createElement, type ComponentPropsWithRef, type JSX } from "react";
import { cn } from "@/utils/cn";

type NativeElement = keyof JSX.IntrinsicElements;

export type BlendScopeProps<T extends NativeElement = "div"> = {
  as?: T;
} & Omit<ComponentPropsWithRef<T>, "as">;

export function BlendScope<T extends NativeElement = "div">({
  as,
  className,
  ...props
}: BlendScopeProps<T>) {
  return createElement(as ?? "div", {
    ...props,
    className: cn("relative isolate", className),
  });
}
