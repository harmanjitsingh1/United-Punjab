import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";

export default function ProtectedRoute() {
  const { userProfile, screenLoading, isAuthorized } = useSelector(
    (state) => state.auth
  );

  if (screenLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthorized || !userProfile) {
    return <Navigate to="/login" replace />;
  }

  if (!userProfile.isVerified) {
    return <Navigate to="/verify-otp" />;
  }

  return <Outlet />;
}