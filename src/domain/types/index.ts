import type { IconType } from "react-icons"

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

export interface IEntryModel {
  id: string
  slug: string
  title: string
  description: string
  content?: Item[]
  technologies: ITechnology[]
  brand?: IBrand
  image: string | null
  category?: ICategory
  type?: IEntryType
  badges?: IBadge[]
  externalLink?: IExternalLink
  date_string?: string
}

export interface IEntryType {
  id: number
  pluralLabel: string
  singularLabel: string
}

export interface IExternalLink {
  url: string
  label?: string
  icon_svg?: string
}

export interface IBadge {
  id: number
  title: string
  description?: string
  svg?: string
}

export interface IEntry {
  id: number
  slug: string
  title: string
  description: string
  image: string | null
  type: TRefId
  category: TRefId
  // links: ILink[]
  brand: TRefId
  badges: TRefId[]
  externalLink: IExternalLink | null
  date_string: string
}

export interface IBrand {
  id: number
  name: string
  description?: string
  image: string
  url: string
}

export type TRefId = {
  id: number
  // title: string
}

export type TRefIdWithTitle = {
  id: number
  title: string
}
