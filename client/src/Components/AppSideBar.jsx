import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { getNavItems } from "./NavBar";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { set } from "zod";

export function AppSidebar() {
  const { t } = useTranslation();
  const navItems = getNavItems(t);

  const { open, setOpen } = useSidebar();
  const location = useLocation();

  const handleNavClick = () => {
    if (open) setOpen(false);
  };

  // useEffect(() => {
  //   if (open) {
  //     setOpen(false);
  //   }
  // }, [location.pathname]);

  return (
    <Sidebar>
      <SidebarContent className={"bg-[#1C1C1A]"}>
        <SidebarGroup className={"p-0"}>
          <SidebarGroupLabel
            className={
              "p-0 py-6 px-4 border-b border-[#F57517] mb-4 text-[#F57517] text-2xl rounded-none"
            }
          >
            {t("brandName")}
          </SidebarGroupLabel>
          <SidebarGroupContent className={"px-4 mt-2"}>
            <SidebarMenu>
              {/* {navItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    className="text-white hover:bg-[#F57517] hover:text-white"
                  >
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-2 py-1 rounded-md transition-colors duration-200 ${
                          isActive ? "bg-[#F57517] text-white" : "text-white"
                        }`
                      }
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}

              <nav>
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <NavLink
                      onClick={handleNavClick}
                        to={item.href}
                        end={item.href === "/"} // exact match for root
                        className={({ isActive }) =>
                          `flex items-center  gap-3 px-4 py-2 rounded-md transition-colors duration-150 truncate ${
                            isActive
                              ? "bg-[#F57517] text-white"
                              : "text-white hover:text-[#F57517] hover:bg-[#2A2A28]"
                          }`.replace(/\s+/g, " ")
                        }
                      >
                        <span>{t(item.label)}</span>
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </ul>
              </nav>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
