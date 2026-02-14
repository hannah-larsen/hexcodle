import React from "react";
import NavbarClient from "./NavbarClient";
import { getHexcodleNumber, getMiniNumber } from "../timeUtils";

export default async function Navbar() {
    const hexcodleNumber = await getHexcodleNumber();
    const miniNumber = await getMiniNumber();

    return <NavbarClient hexcodleNumber={hexcodleNumber} miniNumber={miniNumber} />;
}
