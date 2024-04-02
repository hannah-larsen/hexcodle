"use client";
import { usePathname } from "next/navigation";
import { getHexcodleNumber, getMiniNumber } from "../utils";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function NavbarCenter() {
  const pathname = usePathname();
  const pathComponents = pathname.split("/").filter(Boolean);

  if (pathname === "/archive") {
    return (
      <Link href={"/"}>
        <p className="roboto font-semibold tracking-tight">Hexcodle Archive</p>
      </Link>
    );
  }

  if (pathname === "/mini/archive") {
    return (
      <Link href={"/mini"}>
        <p className="roboto font-semibold tracking-tight">Mini Archive</p>
      </Link>
    );
  }

  if (pathname === "/custom-archive") {
    return (
      <Link href={"/custom-archive"}>
        <p className="roboto font-semibold tracking-tight">Hexcodle Extras</p>
      </Link>
    );
  }

  if (pathComponents[0] === "archive" && isNaN(pathComponents[1])) {
    return (
      <Link href={"/custom-archive"}>
        <p className="roboto font-semibold tracking-tight">
          Hexcodle #{pathComponents[1]}
        </p>
      </Link>
    );
  }

  if (
    pathname === "/" ||
    (pathComponents[0] === "archive" &&
      pathComponents[1] == getHexcodleNumber())
  ) {
    const currentDay = getHexcodleNumber();
    return (
      <>
        <CaretLeftOutlined style={{ color: "var(--gray-300)" }} />
        <Link href={"/"}>
          <p className="roboto font-semibold tracking-tight">
            Hexcodle #{currentDay}
          </p>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center"
          href={`/archive/${parseInt(currentDay, 10) - 1}`}
        >
          <CaretRightOutlined />
        </Link>
      </>
    );
  }

  if (pathComponents[0] === "archive" && pathComponents[1]) {
    const currentDay = pathComponents[1];
    return (
      <>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center"
          href={`/archive/${parseInt(currentDay, 10) + 1}`}
        >
          <CaretLeftOutlined />
        </Link>
        <Link href={"/"}>
          <p className="roboto font-semibold tracking-tight">
            Hexcodle #{currentDay}
          </p>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center"
          href={`/archive/${parseInt(currentDay, 10) - 1}`}
        >
          <CaretRightOutlined />
        </Link>
      </>
    );
  }

  if (
    pathname === "/mini" ||
    (pathComponents[0] === "mini" &&
      pathComponents[1] === "archive" &&
      pathComponents[2] == getMiniNumber())
  ) {
    const currentDay = getMiniNumber();
    return (
      <>
        <CaretLeftOutlined style={{ color: "var(--gray-300)" }} />
        <Link href={"/mini"}>
          <p className="roboto font-semibold tracking-tight">
            Mini #{currentDay}
          </p>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center"
          href={`/mini/archive/${parseInt(currentDay, 10) - 1}`}
        >
          <CaretRightOutlined />
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
    return (
      <>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center"
          href={`/mini/archive/${parseInt(currentDay, 10) + 1}`}
        >
          <CaretLeftOutlined />
        </Link>
        <Link href={"/mini"}>
          <p className="roboto font-semibold tracking-tight">
            Mini #{currentDay}
          </p>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="flex items-center justify-center"
          href={`/mini/archive/${parseInt(currentDay, 10) - 1}`}
        >
          <CaretRightOutlined />
        </Link>
      </>
    );
  }

  if (pathComponents[0] === "blog") {
    return (
      <Link href={"/blog"}>
        <p className="roboto font-semibold tracking-tight">Hexcodle Blog</p>
      </Link>
    );
  }

  return <p>{pathComponents.toString()}</p>;
}
