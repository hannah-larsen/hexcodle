import Modal from "antd/lib/modal";

export default function LaunchModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title="Hexcodle Updates: February 12th, 2024"
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
        <strong>Contest</strong>
      </p>
      <p>
        Congratulations to the winners of our custom colour contest! Head on
        over to our archive to play the winning contest puzzles and see if your
        submission won! 🎉
      </p>
      <p>
        <strong>Game Updates</strong>
      </p>
      <p>
        New game modes are available! Click the gear icon on the top right
        corner of the screen to toggle between our various game modes.
      </p>
      <center>
        <img src="/hexparrot-animated.gif" alt="Hex Parrot Win" />
      </center>
      <p>- Hannah & Ekim</p>
      <p style={{ fontSize: "0.7rem" }}>
        If you like playing Hexcodle and wish to support the developers, we have
        a link set up{" "}
        <a target="_blank" href="https://www.buymeacoffee.com/hexcodle">
          here
        </a>
        . Donations are appreciated, but are in no way mandatory. Thank you to
        everyone who has supported us!
      </p>
    </Modal>
  );
}
