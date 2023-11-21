import Modal from "antd/lib/modal";

export default function HexInfoModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title="How the HEX do hex codes work?"
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
        A hex code can be
        represented as RRGGBB where R represents red, G represents green and B
        represents the blue values. The digits/letters in these locations denote the
        intensity of that colour; 0 being the lowest, and F being the highest.
      </p>
      <p>
        0-9 are the first 10 values and A-F can be represented as digits
        10-15, where 0 is the lowest intensity, and 15, or F, is the hightest
        intensity.
      </p>
      <p>
        Some common hex codes are as follows:
        <ul id="hexList">
          <li style={{ color: "#B5B5B1" }}>
            #FFFFFF: White (full intensity for all RGB components)
          </li>
          <li>#000000: Black (no intensity for all RGB components)</li>
          <li style={{ color: "red" }}>
            #FF0000: Red (full intensity for red, no intensity for green and
            blue)
          </li>
          <li style={{ color: "green" }}>
            #00FF00: Green (full intensity for green, no intensity for red and
            blue)
          </li>
          <li style={{ color: "blue" }}>
            #0000FF: Blue (full intensity for blue, no intensity for red and
            green)
          </li>
        </ul>
      </p>
      <p>
        Still a little confused? No stress! Try the{" "}
        <a href="https://htmlcolorcodes.com/">hex colour codes</a> website.
      </p>
    </Modal>
  );
}
