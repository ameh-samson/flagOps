import logo from "@/assets/svg/flagOps-logo.svg";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import type { LoginProps } from "@/types";

const LoginForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isLoading,
}: LoginProps) => {
  return (
    <main className="h-dvh grid place-items-center place-content-center bg-[#F9FAFB] ">
      <div className="flex flex-col items-center mb-5">
        <img src={logo} alt="flagOps logo" />
        <h1 className="text-secondary text-2xl font-bold mb-2">FlagOps</h1>
        <p className="text-subtext text-xs">
          Manage your feature flags with confidence
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg w-md drop-shadow-sm drop-shadow-black/10">
        <h2 className="text-lg font-semibold mb-6">Sign in to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            register={register}
            error={errors.email}
            className="border-none focus:ring-0 drop-shadow-sm drop-shadow-black/5"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            error={errors.password}
            className="border-none focus:ring-0 drop-shadow-sm drop-shadow-black/5"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <Input type="checkbox" name="rememberMe" register={register} />
              Remember me
            </label>

            <button
              type="button"
              id="forget password"
              className="text-xs font-medium text-primary cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" id="login" disabled={isLoading}>
            Login
          </Button>
        </form>
      </div>

      <p className="text-xs text-subtext mt-4">
        Don't have an account?{" "}
        <span className="text-primary  font-medium">
          Contact your administrator
        </span>
      </p>
    </main>
  );
};

export default LoginForm;
