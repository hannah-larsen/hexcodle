"use client";

import { usePathname } from "next/navigation";
import RulesModal from "./RulesModal";
import SettingsModal from "./SettingsModal";

export default function NavbarRight() {
  const pathname = usePathname();
  const isHexcodle = /^\/(archive\/[^\/]+)?$/.test(pathname);
  const isHexcodleOrMini =
    /^\/(archive\/[^\/]+|mini(\/archive\/[^\/]+)?)?$/.test(pathname);

  return (
    <div className="flex flex-1 flex-row items-center justify-end">
      {isHexcodleOrMini && (
        <SettingsModal mode={isHexcodle ? "hexcodle" : "mini"} />
      )}
      {isHexcodleOrMini && <RulesModal />}
    </div>
  );
}
