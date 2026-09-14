// Sanity content keys each page needs (matches the composables its components call).
// Keys shared by the layout (navigation, footer) are always loaded already.
const PAGE_KEYS: Record<string, string[]> = {
  '/': ['hero', 'band', 'home', 'albums', 'music', 'gigs'],
  '/music': ['albums', 'music', 'hero'],
  '/gigs': ['gigs', 'footer'],
  '/merch': ['merch', 'merchContent', 'merchProducts'],
  '/contact': ['contact'],
  '/impressum': ['legal'],
  '/datenschutz': ['legal'],
}

interface HeroImage {
  url?: string
  // Same srcset widths / sizes / fallback width as the page's <img>, so the
  // browser selects (and caches) exactly the rendition the page will request
  widths?: number[]
  sizes?: string
  width?: number
}

// The hero image(s) of each page: the first thing seen after navigation, and
// the only part that still arrived visibly late once the data was prefetched.
// Keep in sync with the <img> attributes in the named components.
const PAGE_HERO_IMAGES: Record<string, (data: Record<string, any>) => HeroImage[]> = {
  '/music': data => [
    // HeroPhrase: photo and logo
    { url: data.music?.heroImage?.url, widths: [768, 1280, 1920, 2560], sizes: '100vw', width: 1920 },
    { url: data.hero?.images?.[0]?.url },
  ],
  '/merch': data => [
    // HeroMerch: background photo and logo
    { url: data.merch?.image2?.url, widths: [768, 1280, 1920, 2560], sizes: '100vw' },
    { url: data.merch?.image?.url, widths: [640, 1024, 1536], sizes: '(min-width: 1024px) 896px, 100vw', width: 1024 },
  ],
  '/contact': data => [
    // contact.vue: desktop poster
    { url: data.contact?.posterDesktop, widths: [640, 1080], sizes: '50vw', width: 1080 },
  ],
}

/**
 * Loads page content ahead of navigation so the click is instant.
 *
 * The page composables await their fetches (so a page never renders with empty
 * data), which means a click otherwise waits for the response before the page
 * changes. Putting the response into the Nuxt payload under the same key the
 * composables use (see useSanityData) makes their fetch resolve immediately.
 * Once a page's data is in, its hero image is warmed into the browser cache too.
 */
export function usePrefetchPageData() {
  const nuxtApp = useNuxtApp()
  const inFlight = new Map<string, Promise<void>>()
  const warmedImages = new Set<string>()

  function prefetchKey(key: string): Promise<void> {
    if (nuxtApp.payload.data[key] !== undefined) {
      return Promise.resolve()
    }
    let pending = inFlight.get(key)
    if (!pending) {
      pending = $fetch(`/api/sanity/${key}`)
        .then((data) => {
          nuxtApp.payload.data[key] = data
        })
        .catch(() => {
          // Not critical: the page will fetch normally on navigation
        })
        .finally(() => inFlight.delete(key))
      inFlight.set(key, pending)
    }
    return pending
  }

  function warmImage({ url, widths, sizes, width }: HeroImage) {
    if (!url || warmedImages.has(url)) {
      return
    }
    warmedImages.add(url)
    const img = new Image()
    if (widths) {
      img.sizes = sizes || '100vw'
      img.srcset = sanityImageSrcset(url, widths)
    }
    img.src = sanityImageUrl(url, width)
  }

  // `page` is the unlocalised path used in the navigation ('/', '/gigs', ...)
  async function prefetchPage(page: string) {
    await Promise.all((PAGE_KEYS[page] || []).map(prefetchKey))
    for (const image of PAGE_HERO_IMAGES[page]?.(nuxtApp.payload.data) || []) {
      warmImage(image)
    }
  }

  // Everything the site has, for when the browser is idle after the first page
  function prefetchAll() {
    for (const page of Object.keys(PAGE_KEYS)) {
      prefetchPage(page)
    }
  }

  return { prefetchPage, prefetchAll }
}
