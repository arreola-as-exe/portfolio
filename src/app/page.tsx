import Background from "@/components/background"
import ContactSection from "@/components/sections/ContactSection"
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
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jorge Arreola - Portfolio",
  description: "Fullstack Developer & System Admin",
  authors: [
    {
      name: "Jorge Arreola",
    },
  ],
  openGraph: {
    images: {
      url: process.env.HOSTNAME + "/api/image",
    },
  },
}

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
      <Background />
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
