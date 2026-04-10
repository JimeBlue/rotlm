<template>
  <div>
    <BaseHeroCarousel />
    <BaseBand />
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
  title: 'Raiders of the Lost Missile',
  description: () => t('seo.home.description'),
  ogTitle: 'Raiders of the Lost Missile',
  ogDescription: () => t('seo.home.description'),
  ogImage: 'https://rotlm.com/images/OG-image.jpg',
  ogUrl: () => `https://rotlm.com${route.path}`,
  twitterTitle: 'Raiders of the Lost Missile',
  twitterDescription: () => t('seo.home.description'),
  twitterImage: 'https://rotlm.com/images/OG-image.jpg',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        'name': 'Raiders of the Lost Missile',
        'url': 'https://rotlm.com',
        'image': 'https://rotlm.com/images/OG-image.jpg',
        'sameAs': [
          'https://www.instagram.com/raidersofthelostmissile/',
          'https://open.spotify.com/artist/2L3tyjOm09NgkqtIC4LnLF',
          'https://rotlm.bandcamp.com/',
          'https://www.youtube.com/channel/UCRfBx60HjeENhdeMYnzcimg',
          'https://www.facebook.com/RaidersOfTheLostMissile/',
        ],
      }),
    },
  ],
})
</script>
