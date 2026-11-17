<template>
  <div>
    <BaseHeroMerch />
    <BaseMerchGrid />
    <BaseMerchFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'public',
})

const { t } = useI18n()
const route = useRoute()
useSeoCanonical()

useSeoMeta({
  title: () => t('seo.merch.title'),
  description: () => t('seo.merch.description'),
  ogTitle: () => `${t('seo.merch.title')} | Raiders of the Lost Missile`,
  ogDescription: () => t('seo.merch.description'),
  ogImage: 'https://rotlm.de/images/OG-image.jpg',
  ogUrl: () => `https://rotlm.de${route.path}`,
  twitterTitle: () => `${t('seo.merch.title')} | Raiders of the Lost Missile`,
  twitterDescription: () => t('seo.merch.description'),
  twitterImage: 'https://rotlm.de/images/OG-image.jpg',
})
</script>
