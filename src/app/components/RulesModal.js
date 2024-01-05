import Modal from "antd/lib/modal";

export default function RulesModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title="How to Play"
      open={isOpen}
      onOk={() => {
        setIsOpen(false);
      }}
      onCancel={() => {
        setIsOpen(false);
      }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <p>
        You will have 5 tries to correctly guess the hex code of the colour
        displayed on screen in the <i>target</i> box. After each guess, the
        colour of the hex code you entered will be displayed in the{" "}
        <i>your guess</i> box.
      </p>
      <p>
        There will be symbols that pop up in the <i>guesses</i> section that
        indicate the closeness of your guess. Use these to gauge your next
        guess! Here is what each symbol means:
      </p>
      <p>
        ✅ You got it! <br></br>
        🔼 You need to guess higher (only off by 1 or 2)* <br></br>
        🔽 You need to guess lower (only off by 1 or 2)* <br></br>⏫ You need to
        guess way higher! (off by 3 or more) <br></br>⏬ You need to guess way
        lower! (off by 3 or more) <br></br>
      </p>
      <p>
        *Note: If <i>hard</i> mode is enabled, you will only see if your current
        guess needs to be higher or lower, the closeness of your guess will not
        be revealed.
      </p>
    </Modal>
  );
}
