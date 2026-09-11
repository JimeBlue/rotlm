/**
 * Appends Sanity image CDN parameters for optimized delivery.
 * Only applies to Sanity-hosted images (cdn.sanity.io).
 */
export function sanityImageUrl(url: string, width = 1280, quality = 75): string {
  if (!url || !url.includes('cdn.sanity.io')) {
    return url
  }
  return `${url}?w=${width}&q=${quality}&fm=webp`
}

/**
 * Builds a `srcset` of Sanity CDN renditions so the browser can pick the
 * smallest one that fits the rendered size. Pair it with a `sizes` attribute.
 * Returns an empty string for non-Sanity URLs (the plain `src` is used then).
 */
export function sanityImageSrcset(
  url: string,
  widths: number[] = [400, 640, 800, 1024, 1280, 1600],
  quality = 75,
): string {
  if (!url || !url.includes('cdn.sanity.io')) {
    return ''
  }
  return widths
    .map(w => `${sanityImageUrl(url, w, quality)} ${w}w`)
    .join(', ')
}

/**
 * Reads the original pixel size from a Sanity asset URL, which always ends in
 * `-<width>x<height>.<ext>`. Lets <img> carry width/height (for aspect-ratio
 * space reservation) without an extra GROQ projection.
 */
export function sanityImageDimensions(url: string): { width: number, height: number } | undefined {
  const match = url?.match(/-(\d+)x(\d+)\.[a-z0-9]+(?:\?|$)/i)
  if (!match) {
    return undefined
  }
  return { width: Number(match[1]), height: Number(match[2]) }
}

/**
 * A Sanity image with the data needed to honour the editor's hotspot and crop.
 * Matches the GROQ projection used by the home query.
 */
export interface SanityCropImage {
  url: string
  width: number
  height: number
  alt?: string
  hotspot?: { x: number, y: number, width: number, height: number } | null
  crop?: { top: number, bottom: number, left: number, right: number } | null
}

/**
 * Builds a Sanity CDN URL cropped to a fixed aspect ratio, keeping the editor's
 * crop and centring on the hotspot (same rules as @sanity/image-url).
 */
export function sanityFocalCropUrl(
  image: SanityCropImage,
  targetWidth: number,
  targetHeight: number,
  quality = 75,
): string {
  const { url, width, height } = image
  if (!url || !url.includes('cdn.sanity.io') || !width || !height) {
    return url
  }

  const crop = image.crop || { top: 0, bottom: 0, left: 0, right: 0 }
  const hotspot = image.hotspot || { x: 0.5, y: 0.5, width: 1, height: 1 }

  // Editor crop in pixels
  const cropLeft = Math.round(crop.left * width)
  const cropTop = Math.round(crop.top * height)
  const cropWidth = Math.round(width * (1 - crop.left - crop.right))
  const cropHeight = Math.round(height * (1 - crop.top - crop.bottom))

  // Hotspot centre in pixels (hotspot is relative to the full image)
  const hotspotX = hotspot.x * width
  const hotspotY = hotspot.y * height

  const desiredAspect = targetWidth / targetHeight
  const cropAspect = cropWidth / cropHeight

  let rectLeft = cropLeft
  let rectTop = cropTop
  let rectWidth = cropWidth
  let rectHeight = cropHeight

  if (desiredAspect > cropAspect) {
    // Wider than the crop: keep full width, choose the vertical slice around the hotspot
    rectHeight = Math.round(cropWidth / desiredAspect)
    rectTop = Math.round(hotspotY - rectHeight / 2)
    rectTop = Math.max(cropTop, Math.min(rectTop, cropTop + cropHeight - rectHeight))
  }
  else {
    // Taller than the crop: keep full height, choose the horizontal slice around the hotspot
    rectWidth = Math.round(cropHeight * desiredAspect)
    rectLeft = Math.round(hotspotX - rectWidth / 2)
    rectLeft = Math.max(cropLeft, Math.min(rectLeft, cropLeft + cropWidth - rectWidth))
  }

  return `${url}?rect=${rectLeft},${rectTop},${rectWidth},${rectHeight}&w=${targetWidth}&h=${targetHeight}&fit=crop&q=${quality}&fm=webp`
}
