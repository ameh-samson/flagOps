import { useGetCurrentUserQuery } from "@/redux/features/api-slices/auth-api-slice";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

const PublicLayout = () => {
  const navigate = useNavigate();
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && currentUser?.data) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (currentUser?.data) {
    return null;
  }

  return <Outlet />;
};

export default PublicLayout;
