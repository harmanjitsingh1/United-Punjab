import React, { useState } from "react";
import { getNavItems } from "./NavBar";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Menu, CircleX } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  };

  const { t } = useTranslation();
  const navItems = getNavItems(t);

  return (
    <>
      {/* Trigger button */}
      <div className="cursor-pointer" onClick={toggleSidebar}>
        <Menu />
      </div>

      {/* Overlay + Sidebar */}
      {isOpen && (
        <div
          className="fixed w-screen bg-black/60 inset-0 z-40"
          onClick={toggleSidebar}
        >
          <aside
            className="w-70 h-screen absolute top-0 left-0 z-50 bg-background text-zinc-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">
                {t("brandName")}
              </h2>

              <div
                className="text-foreground cursor-pointer"
                onClick={toggleSidebar}
              >
                <CircleX />
              </div>
            </div>

            {/* Navigation */}
            <nav className="overflow-auto no-scrollbar ">
              <ul className="space-y-1 mt-3 overflow-auto mb-5">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.href}
                      onClick={toggleSidebar}
                      className={({ isActive }) =>
                        `block py-2 px-4 text-lg transition-colors duration-200 mx-3 rounded-md ${
                          isActive
                            ? "bg-popover text-primary" // ✅ Active tab styling
                            : "text-foreground hover:text-primary"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div
                className="py-4 px-5 border-y border-border flex items-center gap-4"
                onClick={toggleSidebar}
              >
                <p className="text-foreground">Toggle Theme</p>
                <ThemeToggle />
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
