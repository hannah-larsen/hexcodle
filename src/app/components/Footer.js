"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  // Mask for clipping the footer's top edge
  const squiggleMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='12'%3E%3Cpath d='M0 12 L 0 6 Q 4 1, 8 6 T 16 6 L 16 12 Z' fill='black'/%3E%3C/svg%3E")`;

  return (
    <footer className="w-full mt-12 bg-transparent">
      {/* The Footer body with clipped top edge */}
      <div
        className="w-full bg-blue-900 pt-16 pb-12 flex flex-col items-center justify-center gap-4"
        style={{
          maskImage: `${squiggleMask}, linear-gradient(to bottom, black 12px, black 100%)`,
          WebkitMaskImage: `${squiggleMask}, linear-gradient(to bottom, black 12px, black 100%)`,
          maskRepeat: "repeat-x, no-repeat",
          WebkitMaskRepeat: "repeat-x, no-repeat",
          maskPosition: "top left, 0 12px",
          WebkitMaskPosition: "top left, 0 12px",
          maskSize: "16px 12px, 100% 100%",
          WebkitMaskSize: "16px 12px, 100% 100%"
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-white font-serif">
            Made by{" "}
            <Link
              href="https://hannah-larsen.github.io"
              target="_blank"
              className="text-white hover:text-blue-100 font-bold underline transition-colors"
            >
              Hannah
            </Link>{" "}
            and{" "}
            <Link
              href="https://ekimerton.github.io"
              target="_blank"
              className="text-white hover:text-blue-100 font-bold underline transition-colors"
            >
              Ekim
            </Link>{" "}
            with <span className="text-xl">🤍</span>
          </p>

          <div className="flex flex-row gap-4 items-center">
            <Link
              href="https://forms.gle/EEX8iJKkr5ATjk6L8"
              target="_blank"
              className="text-blue-100/80 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5"
            >
              Submit Feedback
            </Link>
            <span className="text-blue-800">|</span>
            <Link
              href="https://www.buymeacoffee.com/hexcodle"
              target="_blank"
              className="text-blue-100/80 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
