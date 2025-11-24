// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
// import LoadingScreen from "@/components/LoadingScreen";

// export default function PublicRoute() {
//   const { userProfile, screenLoading, isAuthorized } = useSelector(
//     (state) => state.auth
//   );

//   if (screenLoading) return <LoadingScreen />;

//   if (isAuthorized && !userProfile?.isVerified) {
//     return <Navigate to="/verify-otp" replace />;
//   }
//   return <Outlet />;
// }
