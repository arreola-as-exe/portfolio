import { ISocialMedia } from "@/domain/types";

const icons: ISocialMedia[] = [
  {
    url: "https://github.com/JorgeArreolaS",
    color: "#ffffff",
    key: "github",
  },
  {
    url: "https://www.linkedin.com/in/jorgearreolas/",
    color: "#0A66C2",
    key: "linkedin",
  },
  {
    url: "https://www.instagram.com/jorge.as.exe/",
    color: "#E4405F",
    key: "instagram",
  },
];

export const useSocialLinks = () => {
  return icons;
};
