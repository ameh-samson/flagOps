import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "../../../schemas/authSchema";
import {
  useGetUserRoleQuery,
  useRegisterMutation,
} from "@/redux/features/api-slices/auth-api-slice";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import RegisterForm from "./RegisterForm";

const RegisterContainer = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { refetch: refetchUserRole } = useGetUserRoleQuery();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerUser(data).unwrap();

      if (result.data?.token) {
        sessionStorage.setItem("token", result.data.token);
      }

      await refetchUserRole();

      toast.success(result.message || "Registration successful");
      navigate("/", { replace: true });
    } catch (err) {
      sessionStorage.removeItem("token");
      const error = err as { data?: { error?: string } };
      toast.error(error?.data?.error || "Registration failed");
    }
  };

  return (
    <RegisterForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isLoading={isLoading}
    />
  );
};

export default RegisterContainer;
