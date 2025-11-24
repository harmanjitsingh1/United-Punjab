import { Outlet } from "react-router-dom";
import AppInitializer from "./context/AppInitializer";

export default function RootLayout() {
  return (
    <AppInitializer>
      <Outlet />
    </AppInitializer>
  );
}
