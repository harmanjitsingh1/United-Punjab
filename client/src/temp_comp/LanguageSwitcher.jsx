import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const languageSwitch = useRef(null);
  // const [isOpen, setIsOpen] = useState(true);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const langList = [
    { tetle: "English", code: "en" },
    { tetle: "ਪੰਜਾਬੀ", code: "pa" },
    { tetle: "हिंदी", code: "hi" },
  ];

  return (
    <>
      <div className="fixed bottom-5 right-5 z-10" ref={languageSwitch}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer p-3 rounded-full bg-[#e1e1e1] dark:bg-[#272727] shadow-lg focus:outline-none ">
              <Languages color="#F57517" height={32} width={32} className="" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40 border-0 shadow-lg">
            {langList.map((lang, index) => (
              <DropdownMenuItem
                key={index}
                className={`text-lg md:text-sm px-4 py-3 cursor-pointer ${
                  i18n.language === lang.code
                    ? "font-semibold text-[#F57517]"
                    : ""
                } hover:text-[#F57517] focus:text-[#F57517] !hover:bg-[#fff]`}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.tetle}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
