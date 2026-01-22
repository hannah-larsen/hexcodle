"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, BookHeart, Coffee, MessageCircleDashed, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import NavbarCenter from "./NavbarCenter";
import NavbarRight from "./NavbarRight";

export default function NavbarClient({ hexcodleNumber, miniNumber }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        {
            title: "Hexcodle",
            href: "/",
            icon: "https://www.hexcodle.com/favicon.ico",
            subItems: [
                { title: "Archive", href: "/archive" },
                { title: "Custom Games", href: "/custom-archive" },
            ],
        },
        {
            title: "Hexcodle Mini",
            href: "/mini",
            icon: "https://www.hexcodle.com/favicon.ico",
            subItems: [
                { title: "Archive", href: "/mini/archive" },
                { title: "Custom Games", href: "/mini/custom-archive" },
            ],
        },
    ];

    const footerLinks = [
        { title: "Blog", href: "/blog", icon: <BookHeart className="h-4 w-4" /> },
        {
            title: "Feedback",
            href: "https://docs.google.com/forms/d/e/1FAIpQLSe_EMsc0Gf00wNMl4xZ1t2VcGSY4k7NvqVAnnpoXCi16YgVxw/viewform",
            icon: <MessageCircleDashed className="h-4 w-4" />,
            external: true,
        },
        {
            title: "Donate",
            href: "https://www.buymeacoffee.com/hexcodle",
            icon: <Coffee className="h-4 w-4" />,
            external: true,
        },
    ];

    const squiggleMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='64'%3E%3Cpath d='M0 10 Q 4 5, 8 10 T 16 10 L 16 54 Q 12 59, 8 54 T 0 54 Z' fill='black'/%3E%3C/svg%3E")`;

    return (
        <header className="sticky top-0 w-full z-50 bg-gray-50 mb-10">
            <div className="flex flex-row items-center justify-between p-2 min-h-[60px] max-w-7xl mx-auto w-full">
                <div className="flex-1 flex flex-row items-center justify-start">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMenu}
                        className="hover:bg-gray-200 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6 text-black" />
                        ) : (
                            <Menu className="h-6 w-6 text-black" />
                        )}
                    </Button>
                </div>

                <div className="flex items-center justify-center flex-row gap-1 text-lg md:text-xl shrink-0">
                    <NavbarCenter
                        hexcodleNumber={hexcodleNumber}
                        miniNumber={miniNumber}
                    />
                </div>

                <div className="flex-1 flex justify-end">
                    <NavbarRight />
                </div>
            </div>

            {/* Expanded Menu */}
            <div
                className="overflow-hidden transition-[max-height] duration-1000 ease-in-out bg-gray-50"
                style={{ maxHeight: isOpen ? "600px" : "0" }}
            >
                <div className="max-w-7xl mx-auto p-2 md:p-10 flex flex-col gap-6">
                    {menuItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-row items-center justify-between gap-4 p-4"
                        >
                            <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 group min-w-0"
                            >
                                <div className="relative shrink-0">
                                    <div className="absolute -inset-1 bg-blue-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity" />
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        className="relative h-10 w-10 rounded-lg shadow-sm"
                                    />
                                </div>
                                <h3 className="text-xl md:text-2xl font-serif font-semibold text-gray-800 group-hover:text-blue-900 transition-colors truncate">
                                    {item.title}
                                </h3>
                            </Link>

                            <div className="flex flex-row items-center gap-2 md:gap-4 shrink-0">
                                {item.subItems.map((sub, sIdx) => (
                                    <Link
                                        key={sIdx}
                                        href={sub.href}
                                        onClick={() => setIsOpen(false)}
                                        className="bg-blue-900 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-1.5 text-xs md:text-sm font-bold group/item whitespace-nowrap shadow-sm"
                                    >
                                        <span>{sub.title}</span>
                                        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Links */}
                <div className="bg-gray-50 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto p-4 flex flex-wrap items-center justify-center gap-4 md:gap-8">
                        {footerLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="bg-blue-900 text-white px-5 py-2.5 rounded-xl hover:bg-blue-800 transition-colors group shadow-md flex items-center gap-3"
                                target={link.external ? "_blank" : undefined}
                            >
                                <span className="text-white">
                                    {link.icon}
                                </span>
                                <span className="text-xs md:text-sm font-black tracking-widest uppercase">
                                    {link.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive Squiggly Ribbon using CSS Mask */}
            <Link
                href="/blog"
                className="absolute top-[calc(100%-12px)] left-0 w-full z-10 block bg-blue-900 hover:bg-blue-800 transition-colors duration-300 group/ribbon"
                style={{
                    maskImage: squiggleMask,
                    WebkitMaskImage: squiggleMask,
                    maskRepeat: "repeat-x",
                    WebkitMaskRepeat: "repeat-x",
                    height: "64px",
                }}
            >
                <div className="flex items-center justify-center h-full pt-2">
                    <span className="text-white text-sm md:text-xs font-mono font-bold tracking-wider uppercase opacity-90 flex items-center gap-2 -mt-2">
                        Update: Jan 23 2026
                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 group-hover/ribbon:translate-x-1.5" />
                    </span>
                </div>
            </Link>
        </header>
    );
}
