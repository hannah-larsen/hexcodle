import Modal from "antd/lib/modal";

export default function PatchNotesModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title="Patch Notes 11.20.23"
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
            Introducing...Hexcodle, remastered! The old site layout needed to go, so we added a responsive navbar to easily 
            view everything on both mobile and web!
        </li>
        <li>
            Easy/hard mode toggle. We heard your feedback and understand that not everyone has the same knowledge of
            hex codes, set your difficulty using the toggle switch beside the Hexcodle title.
        </li>
        <li>
            We removed the Hexcodle {"#"} from the main page, but fear not! You can still see the puzzle
            number on the share text.
        </li>
      </ul>
    </Modal>
  );
}
