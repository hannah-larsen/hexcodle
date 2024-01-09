import Modal from "antd/lib/modal";

export default function PatchNotesModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title={<center>☃️Patch Notes 1.9.24☃️</center>}
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
          We see your feedback and we love to improve Hexcodle wherever we can!
          Thank you for playing and taking the time to give us insightful ideas.
          If you left us feedback in our feedback form and we have not addressed
          it, we will get to it soon!
        </li>
        <li>
          <strong>Archive:</strong> You asked, we delivered! Introducing the
          Hexcodle Archive - click the new button at the top of our navbar to
          access all our previous puzzles!
        </li>
        <li>
          <strong>Hexcodle Parrot Naming Contest:</strong> Thank you to everyone
          who entered our contest. Congrats to <strong>Olivia</strong> with
          their submission! The Hexcodle parrot is now officially named{" "}
          <strong>Hexavier</strong>!
        </li>
      </ul>
    </Modal>
  );
}
