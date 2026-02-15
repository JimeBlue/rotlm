export default defineEventHandler(async (event) => {
  const { url } = getQuery(event)

  if (!url || typeof url !== 'string' || !url.includes('cdn.sanity.io')) {
    throw createError({ statusCode: 400, message: 'Invalid image URL' })
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw createError({ statusCode: response.status, message: 'Failed to fetch image' })
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg'
  setResponseHeader(event, 'content-type', contentType)
  setResponseHeader(event, 'cache-control', 'public, max-age=86400')

  return response.arrayBuffer().then(buf => Buffer.from(buf))
})
