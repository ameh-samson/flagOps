import GreaterThan from "@/assets/tsxSvg/greater-than";
import SectionTitle from "../SectionTitle";
import { useLocation, Link } from "react-router";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/feature-flags": "Feature Flags",
  "/feature-flags/new": "Create New Flag",
  "/analytics": "Analytics",
  "/demo-app": "Demo App",
  "/settings": "Settings",
};

const Header = () => {
  const location = useLocation();
  const { pathname } = location;

  const pathSegments = pathname.split("/").filter(Boolean);
  const isNestedRoute = pathSegments.length > 1;

  const parentPath = `/${pathSegments[0]}`;
  const parentTitle = routeTitles[parentPath];
  const currentTitle = routeTitles[location.pathname] || "Unknown Section";

  return (
    <header className="px-8 py-5 bg-white drop-shadow-sm drop-shadow-black/5">
      {isNestedRoute ? (
        <div className="flex items-center gap-4 text-sm">
          <Link
            to={parentPath}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {parentTitle}
          </Link>
          <GreaterThan />
          <SectionTitle>{currentTitle}</SectionTitle>
        </div>
      ) : (
        <SectionTitle>{currentTitle}</SectionTitle>
      )}
    </header>
  );
};

export default Header;
