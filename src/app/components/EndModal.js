import Confetti from "./Confetti";
import Modal from "antd/lib/modal";
import Popover from "antd/lib/popover";
import { compareCharacters, getHexcodleNumber } from "../utils";
import Timer from "./Timer";

export default function EndModal({
  open,
  setOpen,
  guesses,
  color,
  colorName,
  counter,
  win = false,
  hardMode = false,
}) {
  const getSharableString = () => {
    let shareableString = "";
    const hexcodleNumber = getHexcodleNumber();
    if (win) {
      shareableString = `I got Hexcodle #${hexcodleNumber}${
        hardMode ? "*" : ""
      } in ${guesses.length} ${
        guesses.length > 1 ? "guesses" : "guess"
      }!\nhttps://hexcodle.com \n\n`;
    } else {
      shareableString = `I did not solve Hexcodle #${hexcodleNumber}${
        hardMode ? "*" : ""
      }
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
      title={win ? "Congrats!" : "Better luck next time"}
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
          <img src="/hexparrot-animated.gif" alt="Hex Parrot" />
          <p>
            You solved the Hexcodle in {4 - counter} guess
            {4 - counter == 1 ? "" : "es"}. Today{"'"}s color was{" "}
            <strong>{colorName}</strong> ({color}).
          </p>
        </>
      ) : (
        <p>
          Bummer! Today{"'"}s color was {colorName} ({color}). Better luck next
          time!<br></br>
        </p>
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
