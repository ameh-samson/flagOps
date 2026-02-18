import { useGetCurrentUserQuery } from "@/redux/features/api-slices/auth-api-slice";
import { Outlet, useNavigate } from "react-router";

type ProtectedLayoutProps = {
  requireAdmin?: boolean;
};

const ProtectedLayout = ({ requireAdmin }: ProtectedLayoutProps) => {
  const navigate = useNavigate();
  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError || !currentUser?.data) {
    navigate("/login");
    return null;
  } else if (currentUser?.data?.user?.role !== "admin" && requireAdmin) {
    return <div>Access Denied: Admins Only</div>;
  }

  return <Outlet />;
};

export default ProtectedLayout;
