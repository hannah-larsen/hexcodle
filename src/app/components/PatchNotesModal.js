import Modal from "antd/lib/modal";

export default function PatchNotesModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title={<center>❄️Patch Notes 12.12.23❄️</center>}
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
            We see your feedback and we love to improve Hexcodle wherever we can! Thank you for playing
            and taking the time to give us insightful ideas. If you left us feedback in our feedback form and we 
            have not addressed it, we will get to it soon!
        </li>
        <li>
            <strong>General updates:</strong> Updated our backrgound/theme colour to be a bit more calm on the eyes.
        </li>
        <li>
            <strong>Share button updates:</strong> When you complete the game, you can now view the name of the daily colour! 
            We have a mascot now! When you complete the game, you will see the Hexcodle parrot based on your results. What should we name it?
        </li>
      </ul>
    </Modal>
  );
}
