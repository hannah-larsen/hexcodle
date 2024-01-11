import Modal from "antd/lib/modal";

export default function PatchNotesModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title={<center>☃️Patch Notes 1.11.24☃️</center>}
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
          <strong>Archive:</strong> You asked, we delivered! Introducing the
          Hexcodle Archive - click the clock icon to play all our previous
          puzzles!
        </li>
        <li>
          <strong>Site Makeover:</strong> Check out our newly designed site! Our
          navbar has everything you need to navigate Hexcodle.
        </li>
        <li>
          <strong>Bugs:</strong> Please note that our easy/hard toggle is a bit
          buggy if you try to switch it mid-game, we are aware and working on
          fixing it!
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
