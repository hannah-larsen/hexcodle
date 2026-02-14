import Image from "next/image";
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
import { CircleHelp, Check, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, Lightbulb } from "lucide-react";

export default function RulesModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-blue-200/20 hover:text-white transition-colors">
          <CircleHelp className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-xl overflow-auto max-h-[90%] bg-cream-50 border-gray-200">
        <DialogHeader className="space-y-0">
          <DialogTitle className="font-serif text-2xl font-bold">How to Play</DialogTitle>
          <DialogDescription className="font-sans">Learn the basics of Hexcodle</DialogDescription>
        </DialogHeader>

        <div className="font-sans text-gray-700 space-y-4">
          <div className="flex justify-center">
            <div className="w-2/3 rounded-lg overflow-hidden border border-gray-200 shadow-sm mb-2 relative aspect-[1.33]">
              <Image
                src="/demo.gif"
                alt="How to play Hexcodle demo"
                width={300}
                height={500}
                className="w-full h-auto scale-[1.02]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <section>
              <h4 className="font-sans font-bold text-gray-900 text-lg">The Objective</h4>
              <p>
                Guess the 6-digit hex code that matches the target colour in 5 tries. Hex codes are split into three pairs: RRGGBB, where each pair controls the intensity of Red, Green, and Blue.
              </p>
            </section>

            <section>
              <h4 className="font-sans font-bold text-gray-900 text-lg">How to Guess</h4>
              <p>
                Type a valid hex code (0–9, A–F). A good strategy is to start with a colour you&apos;re familiar with—for example, <code className="bg-gray-100 px-1 rounded">0000FF</code> is bright blue, <code className="bg-gray-100 px-1 rounded">008800</code> is a darkish green, and <code className="bg-gray-100 px-1 rounded">FFFF00</code> is bright yellow. You&apos;ll learn more of these naturally as you play!
              </p>
            </section>

            <section>
              <h4 className="font-sans font-bold text-gray-900 text-lg">Understanding Feedback</h4>
              <ul className="list-disc list-outside ml-5 space-y-1">
                <li><span className="font-bold">Checkmark:</span> Exact match.</li>
                <li><span className="font-bold text-blue-700">Single Arrow:</span> You are very close! The target value is within 1 or 2 steps.</li>
                <li><span className="font-bold text-blue-900">Double Arrow:</span> The target value is 3 or more steps away.</li>
              </ul>
              <p className="mt-2 text-sm italic">
                Note: The arrows always point toward the target value (higher or lower).
              </p>
            </section>


            <section>
              <h4 className="font-sans font-bold text-gray-900 text-lg">Game Modes</h4>
              <p>
                Switch to <b>RGB mode</b> or change difficulty in <b>Settings</b>. In RGB mode, hex pairs are converted to 0–255 values, and single arrows represent a distance of 10 or less.
              </p>
            </section>
          </div>




          <p className="text-sm border-t border-gray-100 pt-4">
            New to hex codes? Learn more{" "}
            <a
              target="_blank"
              href="https://www.freecodecamp.org/news/how-hex-code-colors-work-how-to-choose-colors-without-a-color-picker/"
              className="text-blue-500 hover:underline"
            >
              here
            </a>.
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="bg-blue-900 hover:bg-blue-800 text-white font-serif font-bold transition-colors">Close</Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>



    </Dialog>
  );
}
