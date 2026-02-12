/**
 * Appends Sanity image CDN parameters for optimized delivery.
 * Only applies to Sanity-hosted images (cdn.sanity.io).
 */
export function sanityImageUrl(url: string, width = 1280, quality = 75): string {
  if (!url || !url.includes('cdn.sanity.io')) return url
  return `${url}?w=${width}&q=${quality}&fm=webp`
}
