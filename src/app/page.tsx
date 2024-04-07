import Background from "@/components/background"
import ContactSection from "@/components/sections/Contact"
import MainBannerSection from "@/components/sections/MainBanner"
import EntriesSection from "@/components/sections/EntriesSection"
import {
  getBrands,
  getCategories,
  getLinks,
  getEntries,
  getBadges,
  getEntryTypes,
} from "./data/api"
import { DataProvider } from "./data/contexts"
import { revalidateTag } from "next/cache"

export default async function Home() {
  const entries = await getEntries()
  const categories = await getCategories()
  const links = await getLinks()
  const brands = await getBrands()
  const badges = await getBadges()
  const entryTypes = await getEntryTypes()

  const tags = [
    "categories",
    "links",
    "entries",
    "brands",
    "badges",
    "entry_types",
  ]

  for (const tag of tags) {
    revalidateTag(tag)
  }

  return (
    <main>
      <DataProvider
        data={{
          badges,
          categories,
          links,
          entries,
          brands,
          entryTypes,
        }}
      >
        <Background />
        <MainBannerSection />
        <EntriesSection />
        <ContactSection />
      </DataProvider>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              entries,
              categories,
              links,
              brands,
              badges,
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </main>
  )
}
