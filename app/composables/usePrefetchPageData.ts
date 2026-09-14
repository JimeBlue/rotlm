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

/**
 * Loads page content ahead of navigation so the click is instant.
 *
 * The page composables await their fetches (so a page never renders with empty
 * data), which means a click otherwise waits for the response before the page
 * changes. Putting the response into the Nuxt payload under the same key the
 * composables use (see useSanityData) makes their fetch resolve immediately.
 */
export function usePrefetchPageData() {
  const nuxtApp = useNuxtApp()
  const inFlight = new Set<string>()

  async function prefetchKey(key: string) {
    if (nuxtApp.payload.data[key] !== undefined || inFlight.has(key)) {
      return
    }
    inFlight.add(key)
    try {
      nuxtApp.payload.data[key] = await $fetch(`/api/sanity/${key}`)
    }
    catch {
      // Not critical: the page will fetch normally on navigation
    }
    finally {
      inFlight.delete(key)
    }
  }

  // `page` is the unlocalised path used in the navigation ('/', '/gigs', ...)
  function prefetchPage(page: string) {
    for (const key of PAGE_KEYS[page] || []) {
      prefetchKey(key)
    }
  }

  // Everything the site has, for when the browser is idle after the first page
  function prefetchAll() {
    for (const key of new Set(Object.values(PAGE_KEYS).flat())) {
      prefetchKey(key)
    }
  }

  return { prefetchPage, prefetchAll }
}
