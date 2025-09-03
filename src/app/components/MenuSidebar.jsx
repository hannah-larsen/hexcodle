/* eslint-disable @next/next/no-img-element */
import { Button } from "@/app/components/ui/button";
import {
  Menu,
  BookHeart,
  Coffee,
  MessageCircleDashed,
  ShoppingCart,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import Link from "next/link";

export default function MenuSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-none">
          <Menu className="h-6 w-6" />
          <div className="absolute top-0 right-0" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-x-auto">
        <SheetHeader>
          <SheetTitle>Hexcodle</SheetTitle>
          <SheetDescription>
            Thanks for playing! Check out our other games & fun stuff here!
          </SheetDescription>
        </SheetHeader>
        <div className="-mx-4 mt-2">
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <Link href="/">
              <img
                alt="Hexcodle Logo"
                src="https://www.hexcodle.com/favicon.ico"
                className="mr-4 h-6 w-6 rounded-sm"
              />
              Hexcodle
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <Link href="/archive">
              <div className="mr-4 h-6 w-6" />
              Archive
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <Link href="/custom-archive">
              <div className="mr-4 h-6 w-6" />
              Custom Games
            </Link>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <Link href="/mini">
              <img
                alt="Hexcodle Mini Logo"
                src="https://www.hexcodle.com/favicon.ico"
                className="mr-4 h-6 w-6 rounded-sm"
              />
              Hexcodle Mini
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <Link href="/mini/archive">
              <div className="mr-4 h-6 w-6" />
              Archive
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <Link href="/mini/custom-archive">
              <div className="mr-4 h-6 w-6" />
              Custom Games
            </Link>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <Link href="https://www.relatle.lol" target="_blank">
              <img
                alt="Relatle Logo"
                src="https://www.relatle.lol/favicon.ico"
                className="mr-4 h-6 w-6 rounded-sm border"
              />
              Relatle
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <Link href="https://www.relatle.lol/archive" target="_blank">
              <div className="mr-4 h-6 w-6" />
              Archive
            </Link>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <Link href="/blog">
              <BookHeart className="mr-4 h-6 w-6 p-1 bg-blue-300 rounded-sm" />
              Blog
            </Link>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSe_EMsc0Gf00wNMl4xZ1t2VcGSY4k7NvqVAnnpoXCi16YgVxw/viewform"
              target="_blank"
            >
              <MessageCircleDashed className="mr-4 h-6 w-6 p-1 bg-blue-300 rounded-sm" />
              Feedback Form
            </Link>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <Link href="https://hexcodle.myshopify.com" target="_blank">
              <ShoppingCart className="mr-4 h-6 w-6 p-1 bg-indigo-300 rounded-sm" />
              Hexcodle Shop
            </Link>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <Link href="https://www.buymeacoffee.com/hexcodle" target="_blank">
              <Coffee className="mr-4 h-6 w-6 p-1 bg-yellow-300 rounded-sm" />
              Donate
            </Link>
          </Button>
        </div>

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
