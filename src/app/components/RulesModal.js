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
        guess!
      </p>
      <p>
        Symbols that are displayed in the <i>guesses</i> section depend on which
        game setting/difficulty you choose. Head over to the <i>settings</i>{" "}
        icon on the top right corner to choose your preferred game mode!
      </p>
    </Modal>
  );
}
