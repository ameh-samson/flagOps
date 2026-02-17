import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { LoginFormData } from "../schemas/loginSchema";

export type LoginProps = {
  register: UseFormRegister<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: (data: LoginFormData) => void;
  errors: FieldErrors<LoginFormData>;
};
