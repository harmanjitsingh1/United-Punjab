import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";

export default function AuthRoute() {
  const { userProfile, screenLoading, isAuthorized } = useSelector(
    (state) => state.auth
  );

  if (screenLoading) {
    return <LoadingScreen />;
  }

  if (isAuthorized && userProfile) {
    if (!userProfile.isVerified) {
      return <Navigate to="/verify-otp" replace />; 
    }
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}