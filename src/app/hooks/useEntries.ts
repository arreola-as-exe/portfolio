import { IEntryModel, IBadge } from "@/domain/types"
import { useMemo } from "react"
import { useDataContext } from "../data/contexts"

export const useEntries = () => {
  const {
    entries,
    brands,
    categories,
    entryTypes,
    badges,
  } = useDataContext()

  const entriesModels = useMemo(() => {
    return entries.map((entry): IEntryModel => {
      const brand = brands.find((brand) => brand.id === entry.brand?.id)
      const category = categories.find(
        (category) => category.id === entry.category?.id
      )
      const entryBadges = entry.badges
        .map((badge) => {
          const badgeData = badges.find((b) => b.id === badge?.id)
          if (!badgeData) return null
          return {
            id: badge.id,
            title: badgeData?.title,
            description: badgeData?.description,
          }
        })
        .filter(Boolean) as IBadge[]

      const type = entryTypes.find((type) => type.id === entry.type?.id)

      return {
        slug: entry.slug,
        title: entry.title,
        description: entry.description,
        technologies: [],
        brand:
          (brand && {
            id: brand.id,
            name: brand.name,
            url: brand.url,
            image: brand.image,
            description: brand.description,
          }) ??
          undefined,
        image: entry.image,
        badges: entryBadges,
        category,
        type,
        externalLink: entry.externalLink ?? undefined,
      }
    })
  }, [entries])

  return entriesModels
}
