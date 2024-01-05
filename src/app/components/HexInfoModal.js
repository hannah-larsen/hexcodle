import Modal from "antd/lib/modal";

export default function HexInfoModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title={<b>Understanding Hex Codes</b>}
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
        Welcome to Hexcodle! If you are new to the world of hex codes, fear not,
        it is not as complicated as it might seem! Hexadecimal is a numerical
        system that uses 16 as its base, unlike our familiar decimal system that
        uses 10. In the context of Hexcodle, hex codes are a way to represent
        colors, and each hex code is a combination of six characters.
      </p>
      <p>
        <b>Characters</b>
      </p>
      <p>
        A hex code consists of six characters, ranging from 0 to 9 and A to F.
        These characters represent values from 0 to 15 in each digit.
      </p>
      <p>
        <b>Pairs</b>
      </p>
      <p>
        The six characters are divided into three pairs. Each pair represents
        the intensity of one of the primary colors: red, green, and blue (RGB).
      </p>
      <p>
        <b>Example</b>
      </p>
      <p>
        Let's take the hex code #<span style={{ color: "red" }}>4A</span>
        <span style={{ color: "green" }}>7B</span>
        <span style={{ color: "blue" }}>9F</span> as an example.{" "}
        <span style={{ color: "red" }}>4A represents the intensity of red</span>
        ,{" "}
        <span style={{ color: "green" }}>
          7B represents the intensity of green
        </span>
        ,{" "}
        <span style={{ color: "blue" }}>
          9F represents the intensity of blue
        </span>
        .
      </p>
      <p>
        <b>Understanding Intensity</b>
      </p>
      <p>
        Each pair of characters represents the intensity of a color component.
        00 means no intensity (essentially off), while FF means maximum
        intensity (fully on).
      </p>
      <p>
        <b>Help</b>
      </p>
      <p>
        Still a little confused? No stress! Try the{" "}
        <a target="_blank" href="https://htmlcolorcodes.com/">
          hex colour codes
        </a>{" "}
        website.
      </p>
    </Modal>
  );
}
