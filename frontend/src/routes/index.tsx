import LoginContainer from "@/components/screens/login/LoginContainer";
import ProtectedLayout from "@/layout/ProtectedLayout";
import PublicLayout from "@/layout/PublicLayout";
import Dashboard from "@/screens/Dashboard";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index path="/" element={<LoginContainer />} />
      </Route>

      <Route element={<ProtectedLayout requireAdmin />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
