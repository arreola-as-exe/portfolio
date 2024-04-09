
export const API_URL = process.env.API_URL

const EMAIL = process.env.NOCO_EMAIL
const PASS = process.env.NOCO_PASS

export const handleLogin = async () => {
	console.log({EMAIL, PASS})

  const res = await fetch(`${API_URL}/api/v1/auth/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Xc-Gui": "true",
    },
    body: JSON.stringify({
      email: EMAIL,
      password: PASS,
    }),
  })

  if (!res.ok) {
	  console.log(await res.json().catch( () => null ), res)
    throw new Error("Failed to login")
  }

  const { token } = await res.json()

  return token ?? null
}

export const handleApiFetch = async (
  endpoint: string,
  tags: string[],
  token: string
) => {
  const url = `${API_URL}${endpoint}?limit=100`
  const res = await fetch(url, {
    headers: {
      "xc-auth": token,
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

export const getFirstAttachmentPath = (attachments: any[]) => {
  return attachments?.[0]?.path
}

export const getFirstAttachmentAsSvg = async (attachments: any[]) => {
  const path = getFirstAttachmentPath(attachments)
  return await handleSvgFetch(path)
}
