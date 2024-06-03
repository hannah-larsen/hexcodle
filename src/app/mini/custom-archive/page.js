import CustomMiniArchivePage from "./CustomMiniArchivePage";

const customPanelData = [
  {
    id: "contest1",
    colorName: "Blueberry Pi",
    hexcode: "#314",
    urlEndpoint: "contest1",
    date: "Contest 1",
  },
  {
    id: "contest2",
    colorName: "Highlighter Yellow",
    hexcode: "#EF3",
    urlEndpoint: "contest2",
    date: "Contest 2",
  },
  {
    id: "contest3",
    colorName: "Strawberry Marmalade",
    hexcode: "#D22",
    urlEndpoint: "contest3",
    date: "Contest 3",
  },
];

export default function Page({}) {
  return <CustomMiniArchivePage panelsData={customPanelData} />;
}
