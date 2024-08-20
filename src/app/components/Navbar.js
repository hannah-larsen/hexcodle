import React from "react";
import RulesModal from "./RulesModal";
import MenuSidebar from "./MenuSidebar";
import SettingsModal from "./SettingsModal";
import NavbarCenter from "./NavbarCenter";

export default function Navbar({ pathname }) {
  const isHexcodle = /^\/(archive\/[^\/]+)?$/.test(pathname);
  const isHexcodleOrMini =
    /^\/(archive\/[^\/]+|mini(\/archive\/[^\/]+)?)?$/.test(pathname);

  return (
    <header className="sticky top-0 w-full z-20 bg-gray-50 border-b border-gray-400 p-2 flex items-center justify-center min-h-[60px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-1 items-center justify-start">
          <MenuSidebar />
        </div>
        <div className="flex items-center justify-center gap-1 text-2xl sm:text-xl">
          <NavbarCenter pathname={pathname} />
        </div>
        <div className="flex flex-1 items-center justify-end">
          {isHexcodle && <SettingsModal />}
          {isHexcodleOrMini && <RulesModal />}
        </div>
      </div>
    </header>
  );
}
