import LoginContainer from "@/components/screens/login/LoginContainer";
import Layout from "@/layout/Layout";
import { useGetUserRoleQuery } from "@/redux/features/api-slices/auth-api-slice";
import Dashboard from "@/screens/Dashboard";
import NotFound from "@/screens/NotFound";
import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import Flags from "@/screens/Flags";
import RegisterContainer from "@/components/screens/register/RegisterContainer";
import DemoApp from "@/screens/DemoApp";
import Analytics from "@/screens/Analytics";
import Settings from "@/screens/Settings";

const AppRoutes = () => {
  const { data: userRole, isLoading } = useGetUserRoleQuery();

  if (isLoading) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-[calc(100dvh-90px)] flex flex-col items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <>
        {userRole?.data?.role ? (
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute role={userRole}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/feature-flags" element={<Flags />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/demo-app" element={<DemoApp />} />
              <Route path="/settings" element={<Settings />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/register" element={<RegisterContainer />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </>
    </Suspense>
  );
};

export default AppRoutes;
