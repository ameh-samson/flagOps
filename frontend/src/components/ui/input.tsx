import type { UseFormRegister, FieldError } from "react-hook-form";
import { cn } from "@/lib/util";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputProps = {
  label?: string;
  type?: "text" | "email" | "password" | "number" | "checkbox";
  placeholder?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
};

const Input = ({
  label,
  type = "text",
  placeholder,
  name,
  register,
  error,
  className,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-secondary text-xs font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          {...register(name)}
          className={cn(
            "bg-white border border-[#D1D5DB] rounded-md p-2 placeholder:text-sm placeholder:text-[#CCCCCC] text-subtext my-1 focus:outline-none focus:border-primary focus:ring-1 focus:ring-inset focus:ring-primary w-full",
            type === "password" && "pr-10",
            className,
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? (
              <FiEyeOff className="w-5 h-5" />
            ) : (
              <FiEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <span role="alert" className="text-xs text-red-400">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Input;
