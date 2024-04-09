import Background from "@/components/background"
import ContactSection from "@/components/sections/ContactSection"
import MainBannerSection from "@/components/sections/MainBanner"
import EntriesSection from "@/components/sections/EntriesSection"
import { fetchAllData } from "./data/api"
import { DataProvider } from "./data/contexts"
import { revalidateTag } from "next/cache"
import { Metadata } from "next"

const url = process.env.PUBLIC_URL ?? ""

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Jorge Arreola - Portfolio",
  description: "Fullstack Developer & System Admin",
  authors: [
    {
      name: "Jorge Arreola",
    },
  ],
  openGraph: {
    images: {
      url: url + "/api/image",
    },
  },
}

export default async function Home() {
  const data = await fetchAllData()

  if (process.env.NODE_ENV === "development") {
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
  }

  return (
    <main>
      <Background />
      <DataProvider data={data}>
        <MainBannerSection />
        <EntriesSection />
        <ContactSection />
      </DataProvider>
      <pre><code>
        {
          JSON.stringify(data, null, 2)
        }
        </code></pre>
    </main>
  )
}
