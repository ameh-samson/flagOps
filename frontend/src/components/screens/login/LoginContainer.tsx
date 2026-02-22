import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../../schemas/authSchema";
import LoginForm from "./LoginForm";
import { useLoginMutation } from "@/redux/features/api-slices/auth-api-slice";
import { toast } from "sonner";

const LoginContainer = () => {
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap();

      if (result.data?.token) {
        sessionStorage.setItem("token", result.data.token);
      }

      toast.success(result.message || "Login successful");
      window.location.href = "/";
    } catch (err) {
      sessionStorage.removeItem("token");
      const error = err as { data?: { error?: string } };
      toast.error(error?.data?.error || "Login failed");
    }
  };

  return (
    <LoginForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isLoading={isLoading}
    />
  );
};

export default LoginContainer;
