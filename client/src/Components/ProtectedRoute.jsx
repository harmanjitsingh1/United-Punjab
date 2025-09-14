import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const user = useSelector((state) => state.userReducer.userProfile); // ya token check kar

  if (!user) {
    return <Navigate to="/login" replace />; // agar login nahi hai → login page
  }

  return <Outlet />; // agar login hai → niche wale child routes render honge
}
