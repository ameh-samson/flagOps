import Aside from "@/components/aside/Aside";
import Header from "@/components/Header/Header";
import { useGetCurrentUserQuery } from "@/redux/features/api-slices/auth-api-slice";
import { useAppSelector } from "@/redux/hooks";
import { Outlet, useNavigate } from "react-router";

const Layout = () => {
  const navigate = useNavigate();
  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();
  const isCollapsed = useAppSelector((state) => state.navbar.isMenuCollapsed);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError || !currentUser?.data) {
    navigate("/");
  }

  return (
    <div
      className={`h-dvh grid transition-all duration-300 ${
        isCollapsed ? "grid-cols-[80px_1fr]" : "grid-cols-[278px_1fr]"
      }`}
    >
      <Aside />

      <div className="flex flex-col overflow-hidden">
        <Header />

        <main className="overflow-y-auto flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
