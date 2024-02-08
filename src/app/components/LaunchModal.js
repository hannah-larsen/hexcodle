import Modal from "antd/lib/modal";

export default function LaunchModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title="Hexcodle Updates: February 8th, 2023"
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
        <strong>Game Updates</strong>
      </p>
      <p>
        New game modes are available! Click the gear icon on the top right
        corner of the screen to toggle between our various game modes.
      </p>
      <p>
        <strong>Contest</strong>
      </p>
      <p>
        Love Hexcodle? Want to have your very own puzzle featured on our
        website? Submit your colour + name choice
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/1rm-W_P0t25lVo4XeFrsZWoSMeK6gsiPi4JJAkcpJDGc/"
        >
          {" "}
          here
        </a>{" "}
        for a chance to have it featured on Hexcodle.com in our archive!
        Submissions close February 12th.
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
