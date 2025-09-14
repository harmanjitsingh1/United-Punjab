import React, { useState } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "./SideBar";
import { Button } from "./ui/button";
import { CircleUserRound } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSelector } from "react-redux";

function Header() {
  const { t } = useTranslation();

  const state = useSelector((state)=>state.userReducer)
  console.log(state.isAuthorized);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#f0f0f0] dark:bg-[#181818]">
        <div className="w-full border-b  border-primary mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-5">
            <div className="md:hidden">
              <Sidebar />
            </div>

            <Link to={"/"}>
              <h1 className="text-2xl leading-normal font-bold bg-gradient-to-r from-[#ff8c42] via-[#F57517] to-[#ff8c42] bg-clip-text text-transparent transition-all duration-300 whitespace-nowrap">
                {t("brandName")}
              </h1>
            </Link>

            {/* Desktop Menu */}
          </div>

          <div className="flex items-center gap-4">
            <div className={"hidden md:block"}>
              <ThemeToggle />
            </div>

            {state.isAuthorized ? (
              <Link to={"/dashboard"} className="rounded-full cursor-pointer">
                {/* Icon should also adapt to theme */}
                <CircleUserRound
                  className="text-gray-900 dark:text-white"
                  height={35}
                  width={35}
                />
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden md:block">
                  <Button
                    asChild
                    className="bg-transparent border-2 border-[#F57517] text-[#F57517] font-semibold p-4 md:p-4 rounded-lg shadow-lg hover:bg-transparent hover:scale-105 transition-transform"
                  >
                    <span>{t("nav.login")}</span>
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button
                    asChild
                    className="bg-[#F57517] text-white font-semibold p-4 md:p-4 rounded-lg shadow-lg hover:bg-[#F57517] hover:scale-105 transition-transform"
                  >
                    <span>{t("nav.signup")}</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        {/* <NavBar /> */}
      </header>
    </>
  );
}

export default Header;
