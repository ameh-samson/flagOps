import DashboardIcon from "@/assets/tsxSvg/dashboard";
import Flag from "@/assets/tsxSvg/flag";
import { useAppSelector } from "@/redux/hooks";
import type { NavLinks } from "@/types";
import { NavLink } from "react-router";

const Navbar = () => {
  const isCollapsed = useAppSelector((state) => state.navbar.isMenuCollapsed);

  const navLinks: NavLinks[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      label: "Feature Flags",
      path: "/feature-flags",
      icon: <Flag />,
    },
  ];

  return (
    <nav className="px-3 py-6 space-y-1 flex-1">
      {navLinks.map((link) => (
        <NavLink
          to={link.path}
          key={link.label}
          className={({ isActive }) =>
            `flex items-center gap-2 pl-1 rounded-md text-[#94A3B8] ${isActive && "text-[#818CF8] bg-primary"}`
          }
        >
          <span
            className={`flex items-center gap-2 px-2.5 py-2.5 bg-secondary/90 w-full rounded-sm transition-all overflow-hidden ${isCollapsed ? "justify-center" : ""}`}
          >
            {link.icon}
            <span
              className={`transition-opacity duration-300 whitespace-nowrap ${
                isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              {link.label}
            </span>
          </span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
