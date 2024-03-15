import Modal from "antd/lib/modal";

export default function LaunchModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{
        style: { backgroundColor: "var(--primary)", overflow: "hidden" },
      }}
      title="Updates: March 14th, 2024"
      open={isOpen}
      onOk={() => {
        setIsOpen(false);
      }}
      onCancel={() => {
        setIsOpen(false);
      }}
      cancelButtonProps={{ style: { display: "none", overflow: "hidden" } }}
    >
      <p>
        <strong>New Game, Looking for Feedback!</strong>
      </p>
      <p>
        Hey everyone, thanks for giving Hexcodle so much love over the past few
        months. We have exciting news to share with you: we have a new game out
        now and we want YOUR feedback!
      </p>
      <p>
        Introducing... Relatle! A daily game where you have to guess a word
        given synonyms or related words. Play against your friends and see how
        fast you can guess the daily word!
        <p>
          You can find Relate{" "}
          <a href="https://www.relatle.lol" target="_blank">
            here
          </a>
          .
        </p>
        There is a feedback link at the bottom of the website for any input you
        want to share with us. Thanks for playing & we hope you like Relatle as
        much as you love Hexcodle 🤎
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
