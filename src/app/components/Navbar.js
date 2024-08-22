export const dynamic = "force-dynamic";

import React from "react";
import MenuSidebar from "./MenuSidebar";
import NavbarCenter from "./NavbarCenter";
import NavbarRight from "./NavbarRight";
import { getHexcodleNumber, getMiniNumber } from "../timeUtils";
import { headers } from "next/headers";

export default async function Navbar() {
  const headersList = headers();
  const hexcodleNumber = await getHexcodleNumber();
  const miniNumber = await getMiniNumber();

  return (
    <header className="sticky top-0 w-full z-20 bg-gray-50 border-b border-gray-400 p-2 flex flex-row items-center justify-center min-h-[60px]">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex-1 flex flex-row items-center justify-start">
          <MenuSidebar />
        </div>
        <div className="flex items-center justify-center flex-row gap-1 text-lg md:text-xl">
          <NavbarCenter
            hexcodleNumber={hexcodleNumber}
            miniNumber={miniNumber}
          />
        </div>
        <NavbarRight />
      </div>
    </header>
  );
}
