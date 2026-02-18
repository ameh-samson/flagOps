import { cn } from "@/lib/util";
import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return (
    <h1 className={cn("text-lg font-black text-secondary", className)}>
      {children}
    </h1>
  );
};

export default SectionTitle;
