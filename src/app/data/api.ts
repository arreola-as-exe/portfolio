import {
  IBadge,
  IBrand,
  ICategory,
  IEntry,
  ILink,
  TRefId,
} from "@/domain/types"
const API_URL = process.env.API_URL

const handleApiFetch = async (endpoint: string, tags?: string[]) => {
  const url = `${API_URL}${endpoint}`
  const res = await fetch(url, {
    headers: {
      "xc-auth": process.env.API_TOKEN ?? "",
    },
    next: {
      tags: tags ?? [],
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const handleSvgFetch = async (path: string) => {
  const url = `${API_URL}/${path}`
  return await fetch(url).then((res) => res.text())
}

const getFirstAttachmentPath = (attachments: any[]) => {
  return attachments?.[0]?.path
}

// ---

const getFirstAttachmentAsSvg = async (attachments: any[]) => {
  const path = getFirstAttachmentPath(attachments)
  return await handleSvgFetch(path)
}

export const getEntries = async () => {
  const endpoint = process.env.API_ENDPOINT_ENTRIES ?? ""

  const data = await handleApiFetch(endpoint, ["entries"])

  // return data

  const entries: IEntry[] = []

  const badgesProp = process.env.ENTRIES_TO_BADGES_RECORD

  for (let i = 0; i < data.list.length; i++) {
    const entry = data.list[i]

    entries.push({
      id: entry.id,
      title: entry.title,
      description: entry.description,
      image: API_URL + "/" + getFirstAttachmentPath(entry.image),
      category: entry.category,
      badges:
        (badgesProp &&
          entry[badgesProp]?.map(
            (relation: any): TRefId => ({
              id: relation.table2_id,
            })
          )) ??
        [],
      brand: entry.brand,
      type: entry.type,
    })
  }

  return entries
}

export const getCategories = async (): Promise<ICategory[]> => {
  const endpoint = process.env.API_ENDPOINT_CATEGORIES ?? ""
  const data = await handleApiFetch(endpoint, ["categories"])

  const categores: ICategory[] = []

  for (let i = 0; i < data.list.length; i++) {
    const category = data.list[i]

    categores.push({
      id: category.id,
      label: category.title,
      color: category.color,
      slug: category.slug,
      order: category.order,
      svg: await getFirstAttachmentAsSvg(category.svg),
    })
  }

  return categores
}

export const getLinks = async (): Promise<ILink[]> => {
  const endpoint = process.env.API_ENDPOINT_LINKS ?? ""
  const data = await handleApiFetch(endpoint, ["links"])

  return data.list.map((link: any): ILink => {
    return {
      url: link.url,
      color: link.color,
      key: link.title,
    }
  })
}

export const getBrands = async () => {
  const endpoint = process.env.API_ENDPOINT_BRANDS ?? ""
  const data = await handleApiFetch(endpoint, ["brands"])

  const brands: IBrand[] = []

  for (let i = 0; i < data.list?.length; i++){
    const brand = data.list[i]

    brands.push({
      id: brand.id,
      title: brand.title,
      description: brand.description,
      image: API_URL + "/" + getFirstAttachmentPath(brand.logo),
    })
  }
   return brands
}

export const getBadges = async () => {
  const endpoint = process.env.API_ENDPOINT_BADGES ?? ""
  const data = await handleApiFetch(endpoint)

  const badges: IBadge[] = []

  for (let i = 0; i < data.list.length; i++) {
    const badge = data.list[i]

    badges.push({
      id: badge.id,
      title: badge.title,
      description: badge.description,
      svg: await getFirstAttachmentAsSvg(badge.svg),
    })
  }

  return badges
}
