import {
  IBadge,
  IBrand,
  ICategory,
  IEntry,
  IEntryType,
  IExternalLink,
  ILink,
  TRefId,
} from "@/domain/types"
import {
  API_URL,
  getFirstAttachmentAsSvg,
  getFirstAttachmentPath,
  handleApiFetch,
  handleLogin,
} from "./utils"

export const fetchAllData = async () => {
  const token = await handleLogin()

  const [entries, categories, links, brands, badges, entryTypes] =
    await Promise.all([
      getEntries(token),
      getCategories(token),
      getLinks(token),
      getBrands(token),
      getBadges(token),
      getEntryTypes(token),
    ])

  return {
    entries,
    categories,
    links,
    brands,
    badges,
    entryTypes,
  }
}

export const getEntries = async (token: string) => {
  const endpoint = process.env.API_ENDPOINT_ENTRIES ?? ""

  const data = await handleApiFetch(endpoint, ["entries"], token)

  const entries: IEntry[] = []

  const badgesProp = process.env.ENTRIES_TO_BADGES_RECORD

  for (let i = 0; i < data.list.length; i++) {
    const entry = data.list[i]

    const imagePath = getFirstAttachmentPath(entry.image)
    const imageUrl = imagePath ? API_URL + "/" + imagePath : null

    const externalLink: IExternalLink | null =
      (entry.external_link_url && {
        url: entry.external_link_url,
        label: entry.external_link_label,
        icon_svg:
          (await getFirstAttachmentAsSvg(entry.external_link_svg)) ?? null,
      }) ||
      null

    entries.push({
      id: entry.id,
      slug: entry.slug,
      title: entry.title,
      description: entry.description,
      image: imageUrl,
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
      externalLink,
      date_string: entry.date_string,
    })
  }

  return entries
}

export const getCategories = async (token: string): Promise<ICategory[]> => {
  const endpoint = process.env.API_ENDPOINT_CATEGORIES ?? ""
  const data = await handleApiFetch(endpoint, ["categories"], token)

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

export const getLinks = async (token: string): Promise<ILink[]> => {
  const endpoint = process.env.API_ENDPOINT_LINKS ?? ""
  const data = await handleApiFetch(endpoint, ["links"], token)

  return data.list.map((link: any): ILink => {
    return {
      url: link.url,
      color: link.color,
      key: link.title,
    }
  })
}

export const getBrands = async (token: string) => {
  const endpoint = process.env.API_ENDPOINT_BRANDS ?? ""
  const data = await handleApiFetch(endpoint, ["brands"], token)

  const brands: IBrand[] = []

  for (let i = 0; i < data.list?.length; i++) {
    const brand = data.list[i]

    brands.push({
      id: brand.id,
      name: brand.title,
      description: brand.description,
      image: API_URL + "/" + getFirstAttachmentPath(brand.logo),
      url: brand.url,
    })
  }
  return brands
}

export const getBadges = async (token: string) => {
  const endpoint = process.env.API_ENDPOINT_BADGES ?? ""
  const data = await handleApiFetch(endpoint, ["badges"], token)

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

export const getEntryTypes = async (token: string) => {
  const endpoint = process.env.API_ENDPOINT_ENTRY_TYPES ?? ""
  const data = await handleApiFetch(endpoint, ["entry_types"], token)

  const entryTypes: IEntryType[] = []

  for (const entryType of data.list ?? []) {
    entryTypes.push({
      id: entryType.id,
      pluralLabel: entryType.plural_label,
      singularLabel: entryType.singular_label,
    })
  }

  return entryTypes
}
