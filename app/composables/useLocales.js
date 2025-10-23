export function useLocales() {
  const { locale, locales, defaultLocale } = useI18n()
  const localeAlias = computed(() => locales.value.find(l => l.code === locale.value).language)

  const locale_ids = {
    en: '1edbf596-a624-6c3e-8711-afd7016dd504',
    de: '1edbf596-a65d-6778-b708-b796b6718f2f',
    dk: '1ef21abd-967d-6990-9fec-3181fedfa8ce',
    nl: '1ef21abd-9689-6358-801d-97d9e08f52e7',
    fr: '1ef21abd-9693-67d6-8bc8-79ed265746a5',
    it: '1ef21abd-969d-66e6-afe7-ad469eff919e',
    es: '1f00aeaa-42c6-6bbe-bb18-7a79e973bf9d',
  }

  function setLocaleId(current) {
    if (locale.value !== current) {
      return locale_ids[locale.value] || defaultLocale
    }
    return current
  }

  return { localeAlias, setLocaleId }
}
