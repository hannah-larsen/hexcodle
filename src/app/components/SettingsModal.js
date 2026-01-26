"use client";

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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Settings } from "lucide-react";
import { useLocalStorage } from "@mantine/hooks";

export default function SettingsModal({ mode = "mini" }) {
  const [settings, setSettings] = useLocalStorage({
    key: "settings",
    defaultValue: {
      difficulty: "easy",
      colorMode: "hex",
    },
  });

  // Handlers for radio changes
  const handleDifficultyChange = (val) => {
    setSettings({ ...settings, difficulty: val });
  };

  const handleColorModeChange = (val) => {
    setSettings({ ...settings, colorMode: val });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-blue-200/20 hover:text-white transition-colors">
          <Settings className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-lg">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Your changes are saved automatically.
          </DialogDescription>
        </DialogHeader>
        <div>
          <h4>Emoji Legend</h4>
          <p>✅ Correct</p>
          {settings.difficulty === "expert" && (
            <>
              <p>❌ Incorrect</p>
            </>
          )}
          {settings.difficulty === "hard" && (
            <>
              <p>🔼 / 🔽 Guess higher or lower</p>
            </>
          )}
          {settings.difficulty === "easy" && settings.colorMode === "rgb" && (
            <>
              <p>🔼 / 🔽 Guess higher or lower by 1 or 2</p>
              <p>
                <span className="emoji">⤴️</span> /{" "}
                <span className="emoji">⤵️</span> Guess higher or lower by 3 to
                9
              </p>
              <p>⏫️ / ⏬️ Guess higher or lower by 10+</p>
            </>
          )}
          {settings.difficulty === "easy" && settings.colorMode === "hex" && (
            <>
              <p>🔼 / 🔽 Guess higher or lower by 1 or 2</p>
              <p>⏫️ / ⏬️ Guess higher or lower by 3+</p>
            </>
          )}
        </div>
        <div>
          <h4 className="pb-1">Difficulty</h4>
          <RadioGroup
            defaultValue={settings.difficulty}
            onValueChange={(val) => {
              handleDifficultyChange(val);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="easy" id="d1" />
              <Label htmlFor="r1">Easy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hard" id="d2" />
              <Label htmlFor="r2">Hard</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expert" id="d3" />
              <Label htmlFor="r3">Expert</Label>
            </div>
          </RadioGroup>
        </div>
        {mode === "hexcodle" && (
          <div>
            <h4 className="pb-1">Color Mode</h4>
            <RadioGroup
              defaultValue={settings.colorMode}
              onValueChange={(val) => {
                handleColorModeChange(val);
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hex" id="d1" />
                <Label htmlFor="c1">Hexcode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rgb" id="d2" />
                <Label htmlFor="c2">RGB</Label>
              </div>
            </RadioGroup>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
