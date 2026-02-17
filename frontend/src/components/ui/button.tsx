import { cn } from "@/lib/util";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type: "button" | "submit" | "reset";
  id: string;
};

const button = ({ children, className, type, id }: ButtonProps) => {
  return (
    <button
      type={type}
      id={id}
      className={cn(
        "bg-primary text-white p-3 rounded-md w-full cursor-pointer",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default button;
