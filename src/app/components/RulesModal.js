import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";
import { CircleHelp } from "lucide-react";

export default function RulesModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <CircleHelp className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-lg">
        <DialogHeader>
          <DialogTitle>How to Play</DialogTitle>
          <DialogDescription>Learn the basics of Hexcodle</DialogDescription>
        </DialogHeader>
        <p>
          You will have 5 tries to correctly guess the hex code of the colour
          displayed on screen in the <i>target</i> box. After each guess, your
          last guess will be displayed in the <i>your guess</i> box.
          <br /> <br />
          There will be symbols that pop up in the <i>guesses</i> section that
          indicate the closeness of your guess. Use these to gauge your next
          guess!
          <br /> <br />
          Symbols that are displayed in the <i>guesses</i> section depend on
          which game setting/difficulty you choose. Head over to the{" "}
          <i>settings</i> icon on the top right corner to choose your preferred
          game mode!
        </p>
        <p>
          New to hex codes? Click{" "}
          <a
            target="_blank"
            href="https://www.freecodecamp.org/news/how-hex-code-colors-work-how-to-choose-colors-without-a-color-picker/"
            className="text-blue-500 hover:text-blue-300"
          >
            here
          </a>{" "}
          to learn more! <br></br>
          Want to improve your hex guessing skills? Click{" "}
          <a
            target="_blank"
            href="https://youtube.com/shorts/nRogtTo5cxQ?si=wmjYfK79ZQbFAU5S"
            className="text-blue-500 hover:text-blue-300"
          >
            here
          </a>
          !
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
