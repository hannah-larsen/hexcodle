import Confetti from "./Confetti";
import Modal from "antd/lib/modal";
import Popover from "antd/lib/popover";
import { compareCharacters, compareRGB, getScore, hexToRGB } from "../utils";
import Timer from "./Timer";
import Image from "next/image";
import { useLocalStorage } from "@mantine/hooks";

function processHexGuesses(guesses, color, settings) {
  const reversed = [...guesses].reverse();
  const resultLines = reversed.map((guess) => {
    const line = guess
      .substring(1)
      .split("")
      .map((guessChar, index) => {
        const targetChar = color.substring(1).charAt(index);
        return compareCharacters(guessChar, targetChar, settings.difficulty);
      })
      .join("");
    return line;
  });
  return resultLines.join("\n");
}

function processRGBGuesses(guesses, color, settings) {
  let resultString = "";
  const targetRGB = hexToRGB(color);
  const reversed = [...guesses].reverse();
  for (let guess of reversed) {
    const guessRGB = hexToRGB(guess);
    const redComparison = compareRGB(
      guessRGB.red,
      targetRGB.red,
      settings.difficulty
    );
    const greenComparison = compareRGB(
      guessRGB.green,
      targetRGB.green,
      settings.difficulty
    );
    const blueComparison = compareRGB(
      guessRGB.blue,
      targetRGB.blue,
      settings.difficulty
    );
    let line = `🟥${redComparison}🟩${greenComparison}🟦${blueComparison}\n`;
    resultString += line;
  }

  return resultString;
}

export default function EndModal({
  open,
  setOpen,
  guesses,
  color,
  colorName,
  counter,
  win = false,
  hexcodleNumber,
  isMini,
}) {
  const [settings, _setSettings] = useLocalStorage({
    key: "settings",
    defaultValue: {
      difficulty: "easy",
      colorMode: "hex",
    },
  });
  const getSharableString = () => {
    const name = `Hexcodle ${isMini ? "Mini" : ""}`;
    const url = `https://hexcodle.com/${isMini ? "mini" : ""}`;

    let shareableString = "";
    if (win) {
      shareableString = `I got ${name} #${hexcodleNumber} in ${
        guesses.length
      } ${guesses.length > 1 ? "guesses" : "guess"}! \nMy score: ${getScore(
        color,
        guesses
      )}\n${url} \n\n`;
    } else {
      shareableString = `I did not solve ${name} #${hexcodleNumber} \n${url} \n\n`;
    }

    const processGuesses =
      settings.colorMode === "hex" || isMini
        ? processHexGuesses
        : processRGBGuesses;

    shareableString += processGuesses(guesses, color, settings);

    return shareableString;
  };

  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title={
        win ? (
          <center>Congrats!</center>
        ) : (
          <center>Better luck next time</center>
        )
      }
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      {win ? (
        <>
          <Confetti />
          <center>
            <Image
              width={100}
              height={100}
              src="/hexparrot-animated.gif"
              alt="Hexavier the Parrot - Win Animation"
            />
          </center>
          <p>
            You solved the Hexcodle {isMini ? "Mini" : ""} in {counter} guess
            {counter == 1 ? "" : "es"}. The hidden colour was{" "}
            <strong>{colorName}</strong> ({color}).
          </p>
          {<p>Your score: {getScore(color, guesses)}</p>}
        </>
      ) : (
        <>
          <center>
            <Image
              width={100}
              height={100}
              src="/hexparrot-sad-animation.gif"
              alt="Hexavier the Parrot - Loss Animation"
            />
          </center>
          <p>
            Bummer! Hexcodle {isMini ? "Mini" : ""} #{hexcodleNumber} was{" "}
            <strong>{colorName}</strong> ({color}
            ).
          </p>
          {<p>Your score: {getScore(color, guesses)}</p>}
        </>
      )}
      <Popover content="Copied to clipboard!" trigger="click">
        <a
          onClick={() => {
            navigator.clipboard.writeText(getSharableString());
          }}
          className="text-blue-500 hover:text-blue-300"
        >
          Share your results
        </a>
      </Popover>
      <Timer isModalActive={true} />
    </Modal>
  );
}
