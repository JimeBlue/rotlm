import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wr3ekkel',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const queries: Record<string, string> = {
  navigation: `*[_type == "navigation" && visible == true] | order(order asc) {
    key,
    label
  }`,
  band: `*[_type == "band"][0] {
    title,
    paragraph1,
    paragraph2,
    paragraph3,
    "imageOne": imageOne.asset->url,
    "imageTwo": imageTwo.asset->url,
    members,
    "genres": genres[] {
      name,
      "logo": logo.asset->url
    }
  }`,
  footer: `*[_type == "footer"][0] {
    copyright,
    "socialLinks": socialLinks[] | order(order asc) {
      name,
      url,
      order
    }
  }`,
  albums: `*[_type == "album"] | order(order asc) {
    title,
    "coverImage": coverImage.asset->url,
    spotifyEmbedUrl,
    order
  }`,
}

export default defineEventHandler(async (event) => {
  const queryName = getRouterParam(event, 'query')

  if (!queryName || !queries[queryName]) {
    throw createError({
      statusCode: 400,
      message: `Invalid query: ${queryName}`,
    })
  }

  const result = await client.fetch(queries[queryName])
  return result
})
