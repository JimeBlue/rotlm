export function useSeoCanonical() {
  const route = useRoute()
  const canonical = computed(() => `https://rotlm.de${route.path}`)

  useHead({
    link: computed(() => [{ rel: 'canonical', href: canonical.value }]),
  })

  return { canonical }
}
