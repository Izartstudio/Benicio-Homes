import type { ReactNode } from "react";

type FooterColumnProps = {
  children: ReactNode;
  title: string;
};

export function FooterColumn({ children, title }: FooterColumnProps) {
  return (
    <div>
      <h2 className="font-display text-[1.125rem] font-normal leading-none text-[#232323]">
        {title}
      </h2>
      <div className="mt-[2.375rem] font-display text-[1rem] leading-[1.32]">
        {children}
      </div>
    </div>
  );
}
