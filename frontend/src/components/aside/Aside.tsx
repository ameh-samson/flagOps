import flagOpsLogo from "@/assets/svg/flagOps-two.svg";
import { Link } from "react-router";
import Navbar from "../navbar/Navbar";
import SidebarLeft from "@/assets/tsxSvg/sidebar-left";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleMenu } from "@/redux/features/slices/navbar";
import Logout from "@/assets/tsxSvg/logout";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "@/redux/features/api-slices/auth-api-slice";
import { toast } from "sonner";

const Aside = () => {
  const isCollapsed = useAppSelector((state) => state.navbar.isMenuCollapsed);
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUserQuery();

  const user = currentUser?.data?.user;

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      sessionStorage.removeItem("token");
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (err) {
      const error = err as { data?: { error?: string } };
      toast.error(error?.data?.error || "Logout failed");
    }
  };

  return (
    <div className="bg-secondary-dark flex flex-col">
      <div className="flex items-center justify-between gap-1.5 py-5 px-6">
        {!isCollapsed && (
          <Link to="/">
            <img src={flagOpsLogo} alt="flagOps logo" />
          </Link>
        )}
        <button
          id={isCollapsed ? "expand-menu" : "collapse-menu"}
          aria-label={isCollapsed ? "expand-menu" : "collapse-menu"}
          onClick={handleToggleMenu}
          className={`text-[#94A3B8] cursor-pointer ${isCollapsed ? "rotate-180" : ""} transition-transform`}
        >
          <SidebarLeft />
        </button>
      </div>

      <Navbar />

      <footer className="px-3 py-4 flex items-center justify-between gap-2">
        {isCurrentUserLoading ? (
          <div className="flex items-center gap-3">
            <div className="bg-gray-600 size-9 rounded-full animate-pulse" />
            {!isCollapsed && (
              <div className="space-y-1">
                <div className="h-3 w-20 bg-gray-600 rounded animate-pulse" />
                <div className="h-2 w-12 bg-gray-600 rounded animate-pulse" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <p className="bg-primary text-white size-9 rounded-full flex items-center justify-center text-sm font-medium">
              {user?.name.charAt(0).toUpperCase() || "U"}
            </p>

            {!isCollapsed && (
              <div>
                <p className="text-white text-xs font-medium capitalize">
                  {user?.name || "Anonymous"}
                </p>
                <span className="text-subtext text-[10px] capitalize">
                  {user?.role || "User"}
                </span>
              </div>
            )}
          </div>
        )}
        <button
          id="logout-button"
          aria-label="logout"
          title="logout"
          disabled={isLoading}
          onClick={handleLogout}
          className="cursor-pointer"
        >
          <Logout />
        </button>
      </footer>
    </div>
  );
};

export default Aside;
