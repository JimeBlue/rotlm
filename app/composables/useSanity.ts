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
