import { generateMiniHexcode } from "@/app/utils";
import MiniHexcodle from "../../MiniHexcodle";
import { generateHexcode, getColorName, getMiniNumber } from "@/app/utils";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { id } = params;
  const target = generateMiniHexcode(id);
  const colorName = await getColorName(target);

  const currentHexcodle = getMiniNumber();
  if (isNaN(id) || id > currentHexcodle) {
    redirect("/404");
  }

  return (
    <MiniHexcodle
      targetColor={target}
      colorName={colorName}
      number={id}
      maxDay={currentHexcodle}
    />
  );
}
