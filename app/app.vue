<template>
  <UApp>
    <!-- Thin progress bar for the rare navigation that still has to wait for data -->
    <NuxtLoadingIndicator color="#fde304" :height="2" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
// hreflang links to the same page in every language (+ x-default) and the
// og:locale meta tags. The canonical link comes from useSeoCanonical on each
// page, so it is left out here. The layouts set <html lang> from the same source.
const localeHead = useLocaleHead()

useHead({
  link: computed(() => (localeHead.value.link || []).filter(l => l.rel === 'alternate')),
  meta: computed(() => localeHead.value.meta || []),
})
</script>
