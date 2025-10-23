export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const i18n = nuxtApp.$i18n

  const { locale, locales } = i18n

  const localeAlias = computed(() => {
    const foundLocale = locales.value.find(l => l.code === locale.value)
    return foundLocale ? foundLocale.language : null
  })

  const api = $fetch.create({
    baseURL: '',
    onRequest({ options }) {
      const router = useRouter()
      const currentRoute = router.currentRoute.value
      options.headers = {
        ...options.headers,
        'Accept-Language': localeAlias.value || '',
        'Locale': locale.value || '',
        'Event-ID': currentRoute.params?.event_id || config.public.eventId || '',
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo('/login')
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
