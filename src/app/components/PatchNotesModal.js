import Modal from "antd/lib/modal";

export default function PatchNotesModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title={<center>💙 Patch Notes 1.30.24 💙</center>}
      open={isOpen}
      onOk={() => {
        setIsOpen(false);
      }}
      onCancel={() => {
        setIsOpen(false);
      }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <ul>
        <li>
          <strong>Statistics:</strong> Now introducing...stats! View your game
          stats on the archive page or on the end game modal when you complete a
          game. Streaks are counted... starting now!
        </li>
        <li>
          <strong>Scoring system:</strong> You may have noticed that our scoring
          system is very generous right now, we are working on implementing a
          better scoring algorithm.
        </li>
        <li>
          <strong>New win sound:</strong> After winning a Hexcodle game you can
          hear a victory sound! Wow!
        </li>
        <li>
          <strong>Bugs:</strong> Please note that our easy/hard toggle is a bit
          buggy if you try to switch it mid-game, we are aware and working on
          fixing it! We are also aware of the issue of an infinite archive by
          pressing the left-side arrow - consider this Hexcodle unlimited,
          although these will not count towards your completed games.
        </li>
        <li>
          We see your feedback and we love to improve Hexcodle wherever we can!
          Thank you for playing and taking the time to give us insightful ideas.
          If you left us feedback in our feedback form and we have not addressed
          it, we will get to it soon!
        </li>
      </ul>
    </Modal>
  );
}
