import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/NavBar";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="pt-[53px]">
        <NavBar />
        <Outlet />
        <ScrollToTop />
        <LanguageSwitcher />
      </main>
      <Footer />
    </>
  );
}
