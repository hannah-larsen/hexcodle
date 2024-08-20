"use client";

import { usePathname } from "next/navigation";
import RulesModal from "./RulesModal";
import SettingsModal from "./SettingsModal";

export default function NavbarRight({ hexcodleNumber, miniNumber }) {
  const pathname = usePathname();
  const isHexcodle = /^\/(archive\/[^\/]+)?$/.test(pathname);
  const isHexcodleOrMini =
    /^\/(archive\/[^\/]+|mini(\/archive\/[^\/]+)?)?$/.test(pathname);

  return (
    <div class="flex flex-1 flex-row items-center justify-end">
      {isHexcodle && <SettingsModal />}
      {isHexcodleOrMini && <RulesModal />}
    </div>
  );
}
