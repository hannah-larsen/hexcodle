import Modal from "antd/lib/modal";

export default function LaunchModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title="Hexcodle Updates!"
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
        Hi everyone, thank you for the overwhelming amount of support over the past few days. We love to see people enjoying Hexcodle as much as we do!
      </p>
      <p>
        We have read your <a target="_blank" href="https://forms.gle/EEX8iJKkr5ATjk6L8">feedback</a> and are slowly but surely reaching out to everyone via email. Updates are coming very soon! Thank you for your patience.
      </p>
      <p>
        And now... The moment you have been waiting for. The winning name for the Hexcodle parrot contest is... <b>Hexavier</b>, submitted by <b>Olivia</b>!
      </p>
      <center><img src="/hexparrot-animated.gif" alt="Hex Parrot Win" /></center>
      <p>
        Some honourable name mentions: <b>Popsicle</b>, <b>Ellgeebeetee</b>, <b>Mr. Beef Stew</b>, <b>Flying little red sh*t</b> and <b>Mara Loko</b>, which means colorful in Malagasy.
        Thank you for all the submissions, we had a fun time reading through these choatic and wholesome names.
      </p>
      <p>- Hannah & Ekim</p>
      <p style={{fontSize: "0.7rem"}}>If you like playing Hexcodle and wish to support the developers, we have a link set up <a target="_blank"
          href="https://www.buymeacoffee.com/hexcodle">here</a>. Donations are appreciated, but are in no way mandatory. Thank you to everyone who has supported us!</p>
    </Modal>
  );
}
