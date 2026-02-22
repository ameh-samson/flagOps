import logo from "@/assets/svg/flagOps-logo.svg";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import type { RegisterProps } from "@/types";
import { Link } from "react-router";

const RegisterForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isLoading,
}: RegisterProps) => {
  return (
    <main className="h-dvh grid place-items-center place-content-center bg-[#F9FAFB] overflow-y-auto">
      <div className="flex flex-col items-center mb-5">
        <img src={logo} alt="flagOps logo" />
        <h1 className="text-secondary text-2xl font-bold mb-2">FlagOps</h1>
        <p className="text-subtext text-xs">
          Manage your feature flags with confidence
        </p>
      </div>

      <div className="bg-white p-4 lg:p-8 rounded-lg w-full sm:w-md drop-shadow-md drop-shadow-black/10">
        <h2 className="text-lg font-semibold mb-6">Sign up for an account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Name"
            register={register}
            error={errors.name}
            className="border-none focus:ring-0 drop-shadow-sm drop-shadow-black/5"
          />
          <Input
            label="Email address"
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

          <Button
            type="submit"
            id="login"
            disabled={isLoading}
            className={`${isLoading && "cursor-not-allowed bg-primary/70"}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full size-4 border-b-2 border-white"></span>
                Please wait
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </div>

      <p className="text-xs text-subtext mt-4">
        Don't have an account?{" "}
        <Link to="/login" className="text-primary  font-medium">
          Sign in
        </Link>
      </p>
    </main>
  );
};

export default RegisterForm;
