import flagOpsLogo from "@/assets/svg/flagOps-two.svg";
import { Link } from "react-router";
import Navbar from "../navbar/Navbar";
import SidebarLeft from "@/assets/tsxSvg/sidebar-left";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleMenu } from "@/redux/features/slices/navbar";

const Aside = () => {
  const isCollapsed = useAppSelector((state) => state.navbar.isMenuCollapsed);
  const dispatch = useAppDispatch();

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="bg-secondary-dark">
      <div className="flex items-center justify-between gap-1.5 py-5 px-6">
        {!isCollapsed && (
          <Link to="/dashboard">
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
    </div>
  );
};

export default Aside;
