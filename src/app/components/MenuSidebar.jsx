/* eslint-disable @next/next/no-img-element */
import { Button } from "@/app/components/ui/button";
import { Menu, BookHeart, Coffee, MessageCircleDashed } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";

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

        <h2 className="font-semibold mt-4 mb-2 text-base">
          Check out our other as
        </h2>
        <div className="-mx-4">
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <a href="/">
              <img
                alt="Hexcodle Logo"
                src="https://www.hexcodle.com/favicon.ico"
                className="mr-4 h-6 w-6 rounded-sm"
              />
              Hexcodle
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <a href="/archive">
              <div className="mr-4 h-6 w-6" />
              Archive
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <a href="/custom-archive">
              <div className="mr-4 h-6 w-6" />
              Custom Games
            </a>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <a href="/mini">
              <img
                alt="Hexcodle Mini Logo"
                src="https://www.hexcodle.com/favicon.ico"
                className="mr-4 h-6 w-6 rounded-sm"
              />
              Hexcodle Mini
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <a href="/mini/archive">
              <div className="mr-4 h-6 w-6" />
              Archive
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <a href="/mini/custom-archive">
              <div className="mr-4 h-6 w-6" />
              Custom Games
            </a>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <a href="https://www.relatle.lol" target="_blank">
              <img
                alt="Relatle Logo"
                src="https://www.relatle.lol/favicon.ico"
                className="mr-4 h-6 w-6 rounded-sm border"
              />
              Relatle
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="full"
            className="text-slate-500"
          >
            <a href="https://www.relatle.lol/archive" target="_blank">
              <div className="mr-4 h-6 w-6" />
              Archive
            </a>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <a href="/blog">
              <BookHeart className="mr-4 h-6 w-6 p-1 bg-blue-300 rounded-sm" />
              Blog
            </a>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe_EMsc0Gf00wNMl4xZ1t2VcGSY4k7NvqVAnnpoXCi16YgVxw/viewform"
              target="_blank"
            >
              <MessageCircleDashed className="mr-4 h-6 w-6 p-1 bg-blue-300 rounded-sm" />
              Feedback Form
            </a>
          </Button>
          <Button asChild variant="ghost" size="full" className="font-semibold">
            <a href="https://www.buymeacoffee.com/hexcodle" target="_blank">
              <Coffee className="mr-4 h-6 w-6 p-1 bg-yellow-300 rounded-sm" />
              Donate
            </a>
          </Button>
        </div>

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
