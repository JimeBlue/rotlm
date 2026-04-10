export function useSeoCanonical() {
  const route = useRoute()
  const canonical = computed(() => `https://rotlm.com${route.path}`)

  useHead({
    link: computed(() => [{ rel: 'canonical', href: canonical.value }]),
  })

  return { canonical }
}
