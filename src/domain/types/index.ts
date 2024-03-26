import type { IconType } from "react-icons";
import { TIconsSlugs } from "./simpleicons";

export interface ICategory {
  label: string;
  color: string;
  slug: string;
  svg?: string;
  order?: number;
}

export interface IIcon {
  url: string;
  icon: IconType;
  color: string;
}

export interface ISocialMedia {
  url: string;
  color: string;
  key: string;
}

export interface ICompany {
  name: string;
  url?: string;
  image?: string;
}

export interface ITechnology {
  name: string;
  slug: string;
  color?: string;
}

export type TextItem = {
  type: "text";
  content: string;
};


export type LinkItem = {
  type: "link";
  icon?: string;
  title: string;
  url: string;
}

export type ImageItem = {
  type: "image";
  title: string;
  image: string;
}

export type Item = TextItem | LinkItem | ImageItem;

export interface IProject {
  slug: string;
  title: string;
  description: string;
  content?: Item[]
  technologies: ITechnology[];
  company?: ICompany;
  image: string;
}
