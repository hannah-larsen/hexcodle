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
            displayed on screen in the "target" box. After each guess, the colour of the hex code
            you entered will be displayed in the "your guess" box.
        </p>
        <p>
            There will be symbols that pop up in the "guesses" section that indicate the closeness
            of your guess. Use these to gauge your next guess! Here is what each symbol means:
        </p>
        <p>
            ✅ You got it! <br></br>
            🔼 Guess higher (only off by 1-2) <br></br>
            🔽 Guess lower (only off by 1-2) <br></br>
            ⏫ Guess way higher! (off by 3 or more) <br></br>
            ⏬ Guess way lower! (off by 3 or more) <br></br>
        </p>
        </Modal>
    );
    }