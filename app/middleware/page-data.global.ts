// Loads a page's Sanity content before the router shows the page, so the page
// renders complete on client-side navigation (no empty states or placeholders
// flashing while the data arrives). The current page stays on screen and
// NuxtLoadingIndicator runs while waiting; usually there is nothing to wait for
// because the content was prefetched on hover or during idle time.
//
// This replaces awaiting the data in the components' setup (see useSanity.ts
// for why components must not have an async setup).
export default defineNuxtRouteMiddleware(async (to) => {
  // On the server the components fetch during render; on the first client
  // load the payload already has the data
  if (import.meta.server || useNuxtApp().isHydrating) {
    return
  }

  // i18n names routes `<name>___<locale>`; the prefetch map is keyed by the
  // unlocalised path ('/', '/music', ...)
  const name = String(to.name || '').split('___')[0]
  if (!name) {
    return
  }
  const { prefetchPage } = usePrefetchPageData()
  await prefetchPage(name === 'index' ? '/' : `/${name}`)
})
