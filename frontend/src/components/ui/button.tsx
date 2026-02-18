import { cn } from "@/lib/util";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type: "button" | "submit" | "reset";
  id: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, type, id, ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      id={id}
      className={cn(
        "bg-primary text-white p-3 rounded-md w-full cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
