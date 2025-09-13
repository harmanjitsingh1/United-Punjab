import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const getNavItems = (t) => [
  { label: t("nav.home"), href: "/" },
  { label: t("nav.aboutUs"), href: "/about" },
  { label: t("nav.services"), href: "/services" },
  { label: t("nav.membership"), href: "/membership" },
  { label: t("nav.initiatives"), href: "/initiatives" },
  // { label: t("nav.youth"), href: "/youth" },
  { label: t("nav.scholarships"), href: "/scholarships" },
  { label: t("nav.business"), href: "/business" },
  { label: t("nav.sportsClub"), href: "/sports-club" },
  { label: t("nav.gurmukhi"), href: "/gurmukhi" },
  { label: t("nav.contact"), href: "/contact" },
];

function NavBar() {
  const { t } = useTranslation();
  const navItems = getNavItems(t);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide
        setShow(false);
      } else {
        // scrolling up → show
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`${show ? "translate-y-0" : "-translate-y-full"} 
    fixed w-full hidden md:flex items-center justify-center gap-4 lg:gap-6 
    bg-[#f0f0f0e0] dark:bg-[#18181be0] shadow-lg shadow-[#F57517]/10 transition-transform duration-300 z-40`}
    >
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          className={({ isActive }) =>
            `py-1.5 px-2 text-sm whitespace-nowrap transition-all duration-200 hover:bg-[#dadada] dark:hover:bg-[#1C1C1A]
        ${
          isActive
            ? "text-[#F57517] bg-gray-200 dark:bg-[#2A2A28] border-b border-[#F57517]" // ✅ Active
            : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 " // ✅ Default + hover
        }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBar;
