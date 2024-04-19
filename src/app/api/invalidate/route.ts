import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
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
  return NextResponse.json({ message: "ready" })
}
