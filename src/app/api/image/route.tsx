import { ImageResponse } from "next/og"
import { CSSProperties } from "react"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={
          {
            backgroundImage: `radial-gradient(at left bottom, #010101, #07384D)`,
          } as CSSProperties
        }
        tw="flex flex-col w-full h-full items-left justify-center bg-neutral-900 text-white p-20 relativefrom-stone-600 via-blue-900 to-emerald-600"
      >
        <p tw="text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b text-blue-300">
          {"Hi, I'm"}
        </p>

        <p tw="text-8xl font-bold bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500 ">
          Jorge ArreolaS
        </p>

        <p tw="text-4xl font-semibold text-neutral-200">
          Fullstack Developer & System Admin
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 700,
    }
  )
}
