import { readFile } from "fs/promises"
import path from "path"

export async function GET() {
  const url = process.env.CV_URL
  if (!url) throw new Error("No CV url provided")
  const response = await fetch(url, {
    method: "get",
  })

  // get the file information from the external API
  const resBlob = await response.blob()
  const resBufferArray = await resBlob.arrayBuffer()
  const resBuffer = Buffer.from(resBufferArray)
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`)

  // set the headers to tell the browser to download the file
  const headers = new Headers()
  // remember to change the filename `test.pdf` to whatever you want the downloaded file called
  // headers.append(
  //   "Content-Disposition",
  //   'attachment; filename="CV - Jorge Arreola.pdf"'
  // )
  headers.append("Content-Type", "application/pdf")

  return new Response(resBuffer, {
    headers,
  })
}
