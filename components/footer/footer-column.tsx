import type { ReactNode } from "react";
import { DifferenceText } from "@/components/ui/difference-text";
import styles from "./footer.module.css";

type FooterColumnProps = {
  children: ReactNode;
  title: string;
};

export function FooterColumn({ children, title }: FooterColumnProps) {
  return (
    <div>
      <DifferenceText
        as="h2"
        className={`font-display text-[1.125rem] font-normal leading-none ${styles.columnTitle}`}
      >
        {title}
      </DifferenceText>
      <div
        className={`mt-[2.375rem] font-display text-[1rem] leading-[1.32] ${styles.columnBody}`}
      >
        {children}
      </div>
    </div>
  );
}
