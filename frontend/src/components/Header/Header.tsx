import SectionTitle from "../SectionTitle";
import { useLocation } from "react-router";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/feature-flags": "Feature Flags",
  "/analytics": "Analytics",
  "/demo-app": "Demo App",
  "/settings": "Settings",
};

const Header = () => {
  const location = useLocation();
  const sectionTitle = routeTitles[location.pathname] || "Unknown Section";

  return (
    <header className="px-8 py-5 bg-white drop-shadow-sm drop-shadow-black/5">
      <SectionTitle>{sectionTitle}</SectionTitle>
    </header>
  );
};

export default Header;
