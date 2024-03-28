import Navbar from "@/app/components/Navbar";
export default function Page() {
  return (
    <>
      <Navbar />
      <main
        className="everything"
        style={{ paddingLeft: 0, paddingRight: 0, gap: 0 }}
      >
        <p>Mini Archive</p>
      </main>
    </>
  );
}
