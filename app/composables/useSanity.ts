import type { SanityCropImage } from '~/utils/sanityImage'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wr3ekkel',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export function useSanity() {
  return { client }
}

// Content is fetched from the server route once per visit and kept for the
// whole visit: Nuxt's default cache only serves a key while a component using
// it is mounted, so every navigation refetched the page's content. With this
// cache a key that was fetched (or prefetched, see usePrefetchPageData) is
// reused instantly.
function useSanityData<T = unknown>(name: string, options: { default?: () => T } = {}) {
  return useFetch<T>(`/api/sanity/${name}`, {
    key: name,
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
    ...options,
  })
}

// The page composables below await their fetch. Without the await a component
// mounts with empty data on client-side navigation and re-renders when the
// response arrives (empty states and placeholders flash for a moment); with
// it Nuxt keeps the current page on screen until the next page's data is in.
//
// useNavigation and useFooter are the exception: they are used by the layout
// (AppHeader, AppFooter), whose components must not have an async setup (see
// AppHeader). Their data is fetched on the server for every page and kept in
// the payload, so it is available synchronously anyway.

export function useNavigation() {
  const { locale } = useI18n()

  const { data: rawNavigation } = useSanityData('navigation')

  const navigation = computed(() => {
    if (!rawNavigation.value) return []
    return (rawNavigation.value as any[]).map((item: any) => ({
      key: item.key,
      label: item.label?.[locale.value] || item.label?.en || item.key,
    }))
  })

  return { navigation }
}

export async function useBand() {
  const { locale } = useI18n()

  const { data: rawBand } = await useSanityData('band')

  // Computed property that returns content in the current locale
  // Falls back to English if translation is missing
  const band = computed(() => {
    if (!rawBand.value) return null
    const data = rawBand.value as any
    return {
      title: data.title?.[locale.value] || data.title?.en || '',
      paragraph1: data.paragraph1?.[locale.value] || data.paragraph1?.en || '',
      // paragraph2 is Portable Text (array of blocks), fallback to empty array
      paragraph2: data.paragraph2?.[locale.value] || data.paragraph2?.en || [],
      imageOne: data.imageOne || null,
      imageTwo: data.imageTwo || null,
      bandImage: data.bandImage || null,
      // Transform members to include translated instrument
      members: (data.members || []).map((member: any) => ({
        name: member.name,
        instrument: member.instrument?.[locale.value] || member.instrument?.en || '',
      })),
    }
  })

  return { band }
}

export function useFooter() {
  const { locale } = useI18n()

  const { data: rawFooter } = useSanityData('footer')

  const footer = computed(() => {
    if (!rawFooter.value) return null
    const data = rawFooter.value as any
    return {
      copyright: data.copyright?.[locale.value] || data.copyright?.en || '',
      image1: data.image1 || null,
      image2: data.image2 || null,
      socialLinks: data.socialLinks || [],
    }
  })

  return { footer }
}

export async function useAlbums() {
  const { data: albums } = await useSanityData<any[]>('albums', { default: () => [] })

  return { albums }
}

export async function useHero() {
  const { data: hero } = await useSanityData<{
    videoUrl?: string
    images: { url: string; alt?: string }[]
  }>('hero')

  return { hero }
}

export async function useHome() {
  const { locale } = useI18n()

  const { data: rawHome } = await useSanityData('home')

  const home = computed(() => {
    if (!rawHome.value) { return null }
    const data = rawHome.value as any
    return {
      albumsTitle: data.albumsTitle?.[locale.value] || data.albumsTitle?.en || '',
      gigsTitle: data.gigsTitle?.[locale.value] || data.gigsTitle?.en || '',
      carouselImages: (data.carouselImages || []) as SanityCropImage[],
    }
  })

  return { home }
}

export async function useMerchContent() {
  const { locale } = useI18n()

  const { data: rawMerchContent } = await useSanityData('merchContent')

  const merchContent = computed(() => {
    if (!rawMerchContent.value) return null
    const data = rawMerchContent.value as any
    return {
      title: data.title?.[locale.value] || data.title?.en || '',
      description: data.description?.[locale.value] || data.description?.en || '',
      productOrderText: data.productOrderText?.[locale.value] || data.productOrderText?.en || '',
    }
  })

  return { merchContent }
}

export async function useMerch() {
  const { data: merch } = await useSanityData<{
    image: { url: string; alt?: string }
    image2: { url: string; alt?: string }
    image3: { url: string; alt?: string }
    image4: { url: string; alt?: string }
    image5: { url: string; alt?: string }
    image6: { url: string; alt?: string }
  }>('merch')

  return { merch }
}

export async function useMerchProducts() {
  const { locale } = useI18n()

  const { data: rawProducts } = await useSanityData<any[]>('merchProducts', { default: () => [] })

  const products = computed(() => {
    if (!rawProducts.value) return []
    return (rawProducts.value as any[]).map((p: any) => ({
      productId: p._id,
      image: p.image || null,
      badge: p.badge
        ? {
            show: p.badge.show,
            type: p.badge.type,
            customLabel: p.badge.customLabel?.[locale.value] || p.badge.customLabel?.en || '',
          }
        : null,
      name: p.name?.[locale.value] || p.name?.en || '',
      description: p.description?.[locale.value] || p.description?.en || '',
      price: p.price,
      originalPrice: p.originalPrice ?? null,
    }))
  })

  return { products }
}

export async function useMusic() {
  const { locale } = useI18n()

  const { data: rawMusic } = await useSanityData('music')

  const music = computed(() => {
    if (!rawMusic.value) return null
    const data = rawMusic.value as any
    return {
      title: data.title?.[locale.value] || data.title?.en || '',
      description: data.description?.[locale.value] || data.description?.en || '',
    }
  })

  return { music }
}

export async function useContact() {
  const { locale } = useI18n()

  const { data: rawContact } = await useSanityData('contact')

  const contact = computed(() => {
    if (!rawContact.value) return null
    const data = rawContact.value as any
    return {
      title: data.title?.[locale.value] || data.title?.en || '',
      text: data.text?.[locale.value] || data.text?.en || '',
      posterMobile: data.posterMobile || null,
      posterDesktop: data.posterDesktop || null,
    }
  })

  return { contact }
}

export async function useLegal() {
  const { locale } = useI18n()

  const { data: rawLegal } = await useSanityData('legal')

  // de → de, everything else (en, es, it) → en
  const legal = computed(() => {
    if (!rawLegal.value) return null
    const data = rawLegal.value as any
    const lang = locale.value === 'de' ? 'de' : 'en'
    return {
      impressum: data.impressum?.[lang] || data.impressum?.de || [],
      datenschutz: data.datenschutz?.[lang] || data.datenschutz?.de || [],
    }
  })

  return { legal }
}

export async function useGigs() {
  const { locale } = useI18n()

  const { data: rawGigs } = await useSanityData('gigs')

  const gigs = computed(() => {
    if (!rawGigs.value) return null
    const data = rawGigs.value as any
    return {
      title: data.title?.[locale.value] || data.title?.en || '',
      buttonText: data.buttonText?.[locale.value] || data.buttonText?.en || '',
      pastGigsButtonText: data.pastGigsButtonText?.[locale.value] || data.pastGigsButtonText?.en || '',
      noUpcomingGigs: {
        eyebrow: data.noUpcomingGigs?.eyebrow?.[locale.value] || data.noUpcomingGigs?.eyebrow?.en || '',
        heading: data.noUpcomingGigs?.heading?.[locale.value] || data.noUpcomingGigs?.heading?.en || '',
        description: data.noUpcomingGigs?.description?.[locale.value] || data.noUpcomingGigs?.description?.en || '',
      },
      videoSectionTitle: data.videoSectionTitle?.[locale.value] || data.videoSectionTitle?.en || '',
      videoSectionDescription: data.videoSectionDescription?.[locale.value] || data.videoSectionDescription?.en || '',
      backgroundVideoUrl: data.backgroundVideoUrl || '',
      videoPosterUrl: data.videoPosterUrl || '',
      videoUrl: data.videoUrl || '',
      gridSectionTitle: data.gridSectionTitle?.[locale.value] || data.gridSectionTitle?.en || '',
      gridSectionDescription: data.gridSectionDescription?.[locale.value] || data.gridSectionDescription?.en || '',
      gigsImages: data.gigsImages || [],
      gigsList: (data.gigsList || []).map((gig: any) => ({
        sortDate: gig.sortDate,
        displayDate: gig.displayDate?.[locale.value] || gig.displayDate?.en || '',
        venue: gig.venue || '',
        city: gig.city?.[locale.value] || gig.city?.en || '',
        time: gig.time?.[locale.value] || gig.time?.en || '',
        address: gig.address || '',
        googleMapsLink: gig.googleMapsLink || '',
        venueLink: gig.venueLink || '',
      })),
    }
  })

  return { gigs }
}
