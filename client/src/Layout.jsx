// src/Layout.jsx
import { Outlet } from "react-router-dom";
// import { AppSidebar } from "@/components/AppSideBar"; // your sidebar component
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import ScrollToTop from "./Components/ScrollToTop";
import NavBar from "./Components/NavBar";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="pt-[53px]">
        
        <NavBar />
        <Outlet />

        <ScrollToTop />
      </main>

      <Footer />
    </div>
  );
}
