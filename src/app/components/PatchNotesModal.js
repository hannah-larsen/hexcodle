import Modal from "antd/lib/modal";

export default function PatchNotesModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title={<center>💘 Patch Notes 2.12.24 💘</center>}
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
          <strong>Contest Winners:</strong> Huge thanks to everyone who
          submitted a colour in our custom colour contest! Head on over to our
          archive to play the winning contest puzzles and see if your submission
          won!
        </li>
        <li>
          <strong>New game modes:</strong> You asked, we delivered. RGB and
          Expert modes now available. To toggle between modes, click on the gear
          icon on the top right side of the page.
        </li>
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
          <strong>New win sound:</strong> Play and win a game of Hexcodle to
          hear our new victory noise!
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
