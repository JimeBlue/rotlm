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

export function useNavigation() {
  const { locale } = useI18n()

  const { data: rawNavigation } = useFetch('/api/sanity/navigation', {
    key: 'navigation',
  })

  const navigation = computed(() => {
    if (!rawNavigation.value) return []
    return (rawNavigation.value as any[]).map((item: any) => ({
      key: item.key,
      label: item.label?.[locale.value] || item.label?.en || item.key,
    }))
  })

  return { navigation }
}

export function useBand() {
  const { locale } = useI18n()

  const { data: rawBand } = useFetch('/api/sanity/band', {
    key: 'band',
  })

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
      paragraph3: data.paragraph3?.[locale.value] || data.paragraph3?.en || '',
      imageOne: data.imageOne || null,
      imageTwo: data.imageTwo || null,
      // Transform members to include translated instrument
      members: (data.members || []).map((member: any) => ({
        name: member.name,
        instrument: member.instrument?.[locale.value] || member.instrument?.en || '',
      })),
      // Genre logos
      genres: data.genres || [],
    }
  })

  return { band }
}

export function useFooter() {
  const { locale } = useI18n()

  const { data: rawFooter } = useFetch('/api/sanity/footer', {
    key: 'footer',
  })

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

export function useAlbums() {
  const { data: albums } = useFetch<any[]>('/api/sanity/albums', {
    key: 'albums',
    default: () => [],
  })

  return { albums }
}

export function useHero() {
  const { data: hero } = useFetch<{ images: { url: string; alt?: string }[] }>('/api/sanity/hero', {
    key: 'hero',
  })

  return { hero }
}

export function useMusic() {
  const { locale } = useI18n()

  const { data: rawMusic } = useFetch('/api/sanity/music', {
    key: 'music',
  })

  const music = computed(() => {
    if (!rawMusic.value) return null
    const data = rawMusic.value as any
    return {
      title: data.title?.[locale.value] || data.title?.en || '',
    }
  })

  return { music }
}

export function useGigs() {
  const { locale } = useI18n()

  const { data: rawGigs } = useFetch('/api/sanity/gigs', {
    key: 'gigs',
  })

  const gigs = computed(() => {
    if (!rawGigs.value) return null
    const data = rawGigs.value as any
    return {
      title: data.title?.[locale.value] || data.title?.en || '',
      buttonText: data.buttonText?.[locale.value] || data.buttonText?.en || '',
      pastGigsButtonText: data.pastGigsButtonText?.[locale.value] || data.pastGigsButtonText?.en || '',
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
