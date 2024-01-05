import HexcodleGame from "../../HexcodleGame";
import { generateHexcode, getColorName } from "../../utils";

export default async function Page({ params }) {
  const { id } = params;
  const target = generateHexcode(id);
  const colorName = await getColorName(target);

  return <HexcodleGame targetColor={target} colorName={colorName} />;
}

export async function loader({ params }) {
  // Use params.id to fetch data specific to each page

  const data = await fetchDataForPage(params.id);
  return { props: { data } };
}
