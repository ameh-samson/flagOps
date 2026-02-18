import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { LoginFormData } from "../schemas/loginSchema";
import type { ReactNode } from "react";

export type LoginProps = {
  register: UseFormRegister<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: (data: LoginFormData) => void;
  errors: FieldErrors<LoginFormData>;
  isLoading: boolean;
};


export type NavLinks = {
  label: string;
  path: string;
  icon: ReactNode;
};
