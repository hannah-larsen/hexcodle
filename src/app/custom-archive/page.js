import CustomArchivePage from "./CustomArchivePage";

const customPanelData = [
  {
    id: "CONTEST1",
    colorName: "When Pigs Fly",
    hexcode: "#D46C8D",
    urlEndpoint: "contest1",
    date: "Contest 1",
  },
  {
    id: "CONTEST2",
    colorName: "Rainy Day Sunday",
    hexcode: "#BBC3DB",
    urlEndpoint: "contest2",
    date: "Contest 2",
  },
  {
    id: "CONTEST3",
    colorName: "Food Court Honey Mustard",
    hexcode: "#DCB73E",
    urlEndpoint: "contest3",
    date: "Contest 3",
  },
  {
    id: "HANNAH",
    colorName: "Hannah's Green",
    hexcode: "#83C955",
    urlEndpoint: "hannah",
    date: "Bonus 1",
  },
  {
    id: "EKIM",
    colorName: "Ekim's Blue",
    hexcode: "#1392ED",
    urlEndpoint: "ekim",
    date: "Bonus 2",
  },
  {
    id: "JARED",
    colorName: "Dark Orchid",
    hexcode: "#982890",
    urlEndpoint: "jared",
    date: "Jared Cross",
  },
];

export default function Page({}) {
  return <CustomArchivePage panelsData={customPanelData} />;
}
