"use client";

import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { getHexcodleNumber, getMiniNumber } from "../timeUtils";

// TODO: fix date issue
export default function NavbarCenter({ hexcodleNumber, miniNumber }) {
  const currentMaxHexcodle = getHexcodleNumber();
  const currentMaxMini = getMiniNumber();

  const pathname = usePathname();
  const pathComponents = pathname.split("/").filter(Boolean);
  // Archive Home
  if (pathname === "/archive") {
    return (
      <Link href={"/"} prefetch={false}>
        <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
          Hexcodle Archive
        </p>
      </Link>
    );
  }

  // Mini Archive Home
  if (pathname === "/mini/archive") {
    return (
      <Link href={"/mini"} prefetch={false}>
        <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
          Mini Archive
        </p>
      </Link>
    );
  }

  // Extras Home
  if (pathname === "/custom-archive") {
    return (
      <Link href={"/custom-archive"}>
        <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
          Hexcodle Extras
        </p>
      </Link>
    );
  }

  // Mini Extras Home
  if (pathname === "/mini/custom-archive") {
    return (
      <Link href={"/mini/custom-archive"}>
        <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
          Mini Extras
        </p>
      </Link>
    );
  }

  // Blog
  if (pathComponents[0] === "blog") {
    return (
      <Link href={"/blog"}>
        <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
          Hexcodle Blog
        </p>
      </Link>
    );
  }

  // Custom Page
  if (pathComponents[0] === "archive" && isNaN(pathComponents[1])) {
    return (
      <Link href={"/custom-archive"}>
        <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
          Hexcodle #{pathComponents[1]}
        </p>
      </Link>
    );
  }

  // Custom Page
  if (
    pathComponents[0] === "mini" &&
    pathComponents[1] === "archive" &&
    isNaN(pathComponents[2])
  ) {
    return (
      <Link href={"/mini/custom-archive"}>
        <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
          Mini #{pathComponents[2]}
        </p>
      </Link>
    );
  }

  // Determine if we are on the "latest" game according to the server build
  const isLatestHexcodle = pathname === "/" || (pathComponents[0] === "archive" && pathComponents[1] == hexcodleNumber);
  const isLatestMini = pathname === "/mini" || (pathComponents[0] === "mini" && pathComponents[1] === "archive" && pathComponents[2] == miniNumber);

  if (isLatestHexcodle) {
    const currentDay = hexcodleNumber;
    const canGoForward = currentMaxHexcodle > currentDay;

    return (
      <>
        {canGoForward ? (
          <Link
            style={{ textDecoration: "none" }}
            className="flex items-center justify-center hover:text-blue-200 active:text-blue-300"
            href={`/archive/${parseInt(currentDay, 10) + 1}`}
          >
            <ChevronLeft />
          </Link>
        ) : (
          <ChevronLeft style={{ color: "var(--gray-600)", opacity: 0.5 }} />
        )}
        <Link href={"/"} prefetch={false}>
          <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
            Hexcodle #{currentDay}
          </p>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center hover:text-blue-200 active:text-blue-300"
          href={`/archive/${parseInt(currentDay, 10) - 1}`}
        >
          <ChevronRight />
        </Link>
      </>
    );
  }

  if (pathComponents[0] === "archive" && pathComponents[1]) {
    const currentDay = pathComponents[1];
    const canGoForward = currentMaxHexcodle > currentDay;

    return (
      <>
        {canGoForward ? (
          <Link
            style={{ textDecoration: "none" }}
            className="flex items-center justify-center hover:text-blue-200 active:text-blue-300"
            href={`/archive/${parseInt(currentDay, 10) + 1}`}
          >
            <ChevronLeft />
          </Link>
        ) : (
          <ChevronLeft style={{ color: "var(--gray-600)", opacity: 0.5 }} />
        )}
        <Link href={"/"} prefetch={false}>
          <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
            Hexcodle #{currentDay}
          </p>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center hover:text-blue-200 active:text-blue-300"
          href={`/archive/${parseInt(currentDay, 10) - 1}`}
        >
          <ChevronRight />
        </Link>
      </>
    );
  }

  if (isLatestMini) {
    const currentDay = miniNumber;
    const canGoForward = currentMaxMini > currentDay;

    return (
      <>
        {canGoForward ? (
          <Link
            style={{ textDecoration: "none" }}
            className="flex items-center justify-center hover:text-blue-200 active:text-blue-300"
            href={`/mini/archive/${parseInt(currentDay, 10) + 1}`}
          >
            <ChevronLeft />
          </Link>
        ) : (
          <ChevronLeft style={{ color: "var(--gray-600)", opacity: 0.5 }} />
        )}
        <Link href={"/mini"} prefetch={false}>
          <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
            Mini #{currentDay}
          </p>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center hover:text-blue-200 active:text-blue-300"
          href={`/mini/archive/${parseInt(currentDay, 10) - 1}`}
        >
          <ChevronRight />
        </Link>
      </>
    );
  }

  if (
    pathComponents[0] === "mini" &&
    pathComponents[1] === "archive" &&
    pathComponents[2]
  ) {
    const currentDay = pathComponents[2];
    const canGoForward = currentMaxMini > currentDay;

    return (
      <>
        {canGoForward ? (
          <Link
            style={{ textDecoration: "none" }}
            className="flex items-center justify-center hover:text-blue-200 active:text-blue-300"
            href={`/mini/archive/${parseInt(currentDay, 10) + 1}`}
          >
            <ChevronLeft />
          </Link>
        ) : (
          <ChevronLeft style={{ color: "var(--gray-600)", opacity: 0.5 }} />
        )}
        <Link href={"/mini"} prefetch={false}>
          <p className="font-serif font-semibold tracking-tight text-xl hover:text-blue-200 active:text-blue-300">
            Mini #{currentDay}
          </p>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center hover:text-blue-200 active:text-blue-300"
          href={`/mini/archive/${parseInt(currentDay, 10) - 1}`}
        >
          <ChevronRight />
        </Link>
      </>
    );
  }

  return <p>{pathComponents.toString()}</p>;
}
