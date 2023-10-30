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
  counter,
  win = false,
}) {
  const getSharableString = () => {
    let shareableString = "";
    const hexcodleNumber = getHexcodleNumber();
    if (win) {
      shareableString = `I got Hexcodle #${hexcodleNumber} in ${
        guesses.length
      } ${
        guesses.length > 1 ? "guesses" : "guess"
      }!\nhttps://hexcodle.com \n\n`;
    } else {
      shareableString = `I did not solve Hexcodle #${hexcodleNumber}
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
        const emoji = compareCharacters(guessChar, targetChar);
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
          <p>
            You solved the Hexcodle in {4 - counter} guess
            {4 - counter == 1 ? "" : "es"}.
            <br />
            Come back tomorrow for a new colour!
          </p>
        </>
      ) : (
        <p>
          Bummer! The Hexcodle for today was {color}.<br></br>
          Come back tomorrow for a new colour!
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
