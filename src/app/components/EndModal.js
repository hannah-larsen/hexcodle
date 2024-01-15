import Confetti from "./Confetti";
import Modal from "antd/lib/modal";
import Popover from "antd/lib/popover";
import { compareCharacters, getHexcodleNumber, getScore } from "../utils";
import Timer from "./Timer";
import Image from "next/image";

export default function EndModal({
  open,
  setOpen,
  guesses,
  color,
  colorName,
  counter,
  win = false,
  hardMode = false,
  hexcodleNumber,
}) {
  const getSharableString = () => {
    let shareableString = "";
    if (win) {
      shareableString = `I got Hexcodle #${hexcodleNumber}${
        hardMode ? "*" : ""
      } in ${guesses.length} ${
        guesses.length > 1 ? "guesses" : "guess"
      }! \nMy score: ${getScore(color, guesses)}\nhttps://hexcodle.com \n\n`;
    } else {
      shareableString = `I did not solve Hexcodle #${hexcodleNumber}${
        hardMode ? "*" : ""
      } \nMy score: ${getScore(color, guesses)}
      \nhttps://hexcodle.com \n\n`;
    }

    const reversed = [...guesses].reverse();

    for (let i = 0; i < reversed.length; i++) {
      const guess = reversed[i];
      let line = "";

      for (let j = 0; j < guess.length; j++) {
        const guessChar = guess.substring(1).charAt(j);
        const targetChar = color.substring(1).charAt(j);
        if (!guessChar) {
          continue;
        }
        const emoji = compareCharacters(guessChar, targetChar, hardMode);
        line += emoji;
      }

      shareableString += line + "\n";
    }
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
            You solved the Hexcodle in {counter} guess
            {counter == 1 ? "" : "es"}. Hexcodle #{hexcodleNumber} was{" "}
            <strong>{colorName}</strong> ({color}).
          </p>
          <p>
            Your score is: {getScore(color, guesses)}
          </p>
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
            Bummer! Hexcodle #{hexcodleNumber} was <strong>{colorName}</strong> ({color}
            ).
          </p>
          <p>
            Your score is: {getScore(color, guesses)}
          </p>
        </>
      )}
      <Timer isModalActive={true} />
      <Popover content="Copied to clipboard!" trigger="click">
        <a
          onClick={() => {
            navigator.clipboard.writeText(getSharableString());
          }}
        >
          Share your results
        </a>
      </Popover>
    </Modal>
  );
}
