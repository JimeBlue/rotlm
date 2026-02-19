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
    "image1": image1.asset->url,
    "image2": image2.asset->url,
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
  hero: `*[_type == "hero"][0] {
    "images": images[] {
      "url": asset->url,
      alt
    },
    "carouselImages": carouselImages[] {
      "url": asset->url,
      alt
    }
  }`,
  music: `*[_type == "music"][0] {
    title
  }`,
  merch: `*[_type == "merch"][0] {
    "image": image {
      "url": asset->url,
      alt
    },
    "image2": image2 {
      "url": asset->url,
      alt
    }
  }`,
  merchProducts: `*[_type == "merchProduct" && available == true] | order(order asc, _createdAt asc) {
    "image": image {
      "url": asset->url,
      alt
    },
    badge,
    name,
    description,
    price,
    originalPrice
  }`,
  gigs: `*[_type == "gigs"][0] {
    title,
    buttonText,
    pastGigsButtonText,
    videoSectionTitle,
    videoSectionDescription,
    "backgroundVideoUrl": backgroundVideo.asset->url,
    "videoPosterUrl": videoPoster.asset->url,
    videoUrl,
    gridSectionTitle,
    gridSectionDescription,
    "gigsImages": gigsImages[].asset->url,
    "gigsList": gigsList[] | order(sortDate desc) {
      sortDate,
      displayDate,
      venue,
      city,
      time,
      address,
      googleMapsLink,
      venueLink
    }
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
