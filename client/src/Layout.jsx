// src/Layout.jsx
import { Outlet } from "react-router-dom";
// import { AppSidebar } from "@/components/AppSideBar"; // your sidebar component
import Header from "./components/Header";
import Footer from "./components/Footer";

import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/NavBar";

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
