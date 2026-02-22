import type { UserRoleResponse } from "@/redux/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: UserRoleResponse;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute = ({
  children,
  role,
  requiredRole = "admin",
}: ProtectedRouteProps) => {
  if (!role?.data || role?.data.role !== requiredRole) {
    return <div>You do not have permission to access this route.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
