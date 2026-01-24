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

  const query = `*[_type == "navigation" && visible == true] | order(order asc) {
    key,
    label,
    anchor
  }`

  const { data: rawNavigation, refresh } = useFetch(
    () => `https://${client.config().projectId}.api.sanity.io/v${client.config().apiVersion}/data/query/${client.config().dataset}?query=${encodeURIComponent(query)}`,
    {
      key: 'navigation',
      transform: (response: any) => response.result || [],
    },
  )

  const navigation = computed(() => {
    if (!rawNavigation.value) return []
    return rawNavigation.value.map((item: any) => ({
      key: item.key,
      label: item.label?.[locale.value] || item.label?.en || item.key,
      anchor: item.anchor || null,
    }))
  })

  return { navigation }
}

export function useBand() {
  const { locale } = useI18n()

  // GROQ query: fetch the first band document
  // [0] because there's only one band section
  const query = `*[_type == "band"][0] {
    title,
    paragraph1,
    paragraph2,
    members
  }`

  const { data: rawBand } = useFetch(
    () => `https://${client.config().projectId}.api.sanity.io/v${client.config().apiVersion}/data/query/${client.config().dataset}?query=${encodeURIComponent(query)}`,
    {
      key: 'band',
      transform: (response: any) => response.result || null,
    },
  )

  // Computed property that returns content in the current locale
  // Falls back to English if translation is missing
  const band = computed(() => {
    if (!rawBand.value) return null
    return {
      title: rawBand.value.title?.[locale.value] || rawBand.value.title?.en || '',
      paragraph1: rawBand.value.paragraph1?.[locale.value] || rawBand.value.paragraph1?.en || '',
      // paragraph2 is Portable Text (array of blocks), fallback to empty array
      paragraph2: rawBand.value.paragraph2?.[locale.value] || rawBand.value.paragraph2?.en || [],
      // Transform members to include translated instrument
      members: (rawBand.value.members || []).map((member: any) => ({
        name: member.name,
        instrument: member.instrument?.[locale.value] || member.instrument?.en || '',
      })),
    }
  })

  return { band }
}
