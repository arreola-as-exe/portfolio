import type { IconType } from "react-icons"
import { TIconsSlugs } from "./simpleicons"

export interface ICategory {
  id: number
  label: string
  color: string
  slug: string
  svg?: string
  order?: number
}

export interface IIcon {
  url: string
  icon: IconType
  color: string
}

export interface ILink {
  url: string
  color: string
  key: string
}

export interface ICompany {
  name: string
  url?: string
  image?: string
}

export interface ITechnology {
  name: string
  slug: string
  color?: string
}

export type TextItem = {
  type: "text"
  content: string
}

export type LinkItem = {
  type: "link"
  icon?: string
  title: string
  url: string
}

export type ImageItem = {
  type: "image"
  title: string
  image: string
}

export type Item = TextItem | LinkItem | ImageItem

export interface IProject {
  slug: string
  title: string
  description: string
  content?: Item[]
  technologies: ITechnology[]
  company?: ICompany
  image: string
}

export interface IBadge {
  id: number
  title: string
  description?: string
  svg?: string
}

export interface IEntry {
  id: number
  title: string
  description: string
  image: string
  type: TRefId
  category: TRefId
  // links: ILink[]
  brand: TRefId
  badges: TRefId[]
}

export interface IBrand {
  id: number
  title: string
  description: string
  image: string
}

export type TRefId = {
  id: number
  // title: string
}

export type TRefIdWithTitle = {
  id: number
  title: string
}
