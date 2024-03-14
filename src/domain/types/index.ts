import type { IconType } from "react-icons";

export interface ICategory {
  label: string;
  color: string;
  svg?: string;
}

export interface IIcon {
  url: string;
  icon: IconType;
  color: string;
}

export interface ISocialMedia {
  url: string;
  color: string;
  key: string
}