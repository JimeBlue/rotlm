<template>
  <div>
    <BaseHeroVideo />
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
  // The band name already is the title, so skip the global "%s | Raiders of
  // the Lost Missile" template to avoid "Raiders of the Lost Missile | Raiders..."
  titleTemplate: '%s',
  description: () => t('seo.home.description'),
  ogTitle: 'Raiders of the Lost Missile',
  ogDescription: () => t('seo.home.description'),
  ogImage: 'https://rotlm.de/images/OG-image.jpg',
  ogUrl: () => `https://rotlm.de${route.path}`,
  twitterTitle: 'Raiders of the Lost Missile',
  twitterDescription: () => t('seo.home.description'),
  twitterImage: 'https://rotlm.de/images/OG-image.jpg',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        'name': 'Raiders of the Lost Missile',
        'url': 'https://rotlm.de',
        'image': 'https://rotlm.de/images/OG-image.jpg',
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
