import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthThunk } from "@/store/thunks/user.thunk";
import LoadingScreen from "@/components/LoadingScreen";

export default function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const { screenLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);

  if (screenLoading) return <LoadingScreen />;
  return children;
}
