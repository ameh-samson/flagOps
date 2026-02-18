import LoginContainer from "@/components/screens/login/LoginContainer";
import Layout from "@/layout/Layout";
import { useGetCurrentUserQuery } from "@/redux/features/api-slices/auth-api-slice";
import Dashboard from "@/screens/Dashboard";
import NotFound from "@/screens/NotFound";
import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

const AppRoutes = () => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();

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
        {currentUser?.data ? (
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute currentUser={currentUser}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="demo-app" element={<p>Demo</p>} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </>
    </Suspense>
  );
};

export default AppRoutes;
