import type { LoginResponse } from "@/redux/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  currentUser?: LoginResponse;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute = ({
  children,
  currentUser,
  requiredRole = "admin",
}: ProtectedRouteProps) => {
  if (!currentUser?.data || currentUser?.data.user.role !== requiredRole) {
    return <div>You do not have permission to access this route.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
