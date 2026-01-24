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
    const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.20' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.40'/%3E%3C/svg%3E")`;

    return (
        <header className="fixed top-0 w-full z-50 bg-cream-50 drop-shadow-xl">
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
                className={`grid overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] bg-cream-50 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="min-h-0 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 py-4 md:py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {menuItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col gap-4"
                                >
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900">
                                        {item.title}
                                    </h3>

                                    <div className="flex flex-row gap-2 flex-wrap">
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center gap-1.5 text-xs font-serif font-bold shadow-sm group/item"
                                        >
                                            <span>Play Today</span>
                                            <ChevronRight className="h-3 w-3 transition-transform group-hover/item:translate-x-0.5" />
                                        </Link>
                                        {item.subItems.map((sub, sIdx) => (
                                            <Link
                                                key={sIdx}
                                                href={sub.href}
                                                onClick={() => setIsOpen(false)}
                                                className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center gap-1.5 text-xs font-serif font-bold shadow-sm group/item"
                                            >
                                                <span>{sub.title}</span>
                                                <ChevronRight className="h-3 w-3 transition-transform group-hover/item:translate-x-0.5" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Simplified Footer Links */}
                    <div className="bg-cream-50 border-t border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 py-4 pb-5 flex flex-wrap items-center justify-center gap-6 md:gap-12">
                            {footerLinks.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 text-gray-500 hover:text-blue-900 transition-colors group"
                                    target={link.external ? "_blank" : undefined}
                                >
                                    <span className="text-gray-400 group-hover:text-blue-900 transition-colors">
                                        {React.cloneElement(link.icon, { className: "h-4 w-4" })}
                                    </span>
                                    <span className="text-[10px] md:text-xs font-serif font-bold tracking-widest uppercase">
                                        {link.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
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
                    backgroundImage: noiseTexture,
                    backgroundSize: "75px 75px",
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
