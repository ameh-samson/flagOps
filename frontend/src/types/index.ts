import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { LoginFormData, RegisterFormData } from "../schemas/authSchema";
import type { ReactNode } from "react";

export type LoginProps = {
  register: UseFormRegister<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: (data: LoginFormData) => void;
  errors: FieldErrors<LoginFormData>;
  isLoading: boolean;
};

export type RegisterProps = {
  register: UseFormRegister<RegisterFormData>;
  handleSubmit: UseFormHandleSubmit<RegisterFormData>;
  onSubmit: (data: RegisterFormData) => void;
  errors: FieldErrors<RegisterFormData>;
  isLoading: boolean;
};

export type NavLinks = {
  label: string;
  path: string;
  icon: ReactNode;
};
