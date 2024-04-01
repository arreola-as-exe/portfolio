import Background from "@/components/background"
import ContactSection from "@/components/sections/Contact"
import MainBannerSection from "@/components/sections/MainBanner"
import ProjectsSection from "@/components/sections/Projects"
import {
  getBrands,
  getCategories,
  getLinks,
  getEntries,
  getBadges,
} from "./data/api"
import { DataProvider } from "./data/contexts"
import { revalidateTag } from "next/cache"

export default async function Home() {
  const entries = await getEntries()
  const categories = await getCategories()
  const links = await getLinks()
  const brands = await getBrands()
  const badges = await getBadges()

  const tags = ["categories", "links", "entries", "brands", "badges"]

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
        }}
      >
        <Background />
        <MainBannerSection />
        <ProjectsSection />
        <ContactSection />
      </DataProvider>
      <pre>
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
      </pre>
    </main>
  )
}
