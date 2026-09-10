<template>
  <section id="music" class="relative pb-16 md:pb-24 lg:mb-32">
    <BaseHeroPhrase />
    <div class="container" style="clip-path: inset(0 -100vw)">
      <!-- Decorative fixed pink lines (clipped to container section) -->
      <div class="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img
          src="/images/blue-dotted-line.png"
          alt=""
          class="absolute w-[250vw] top-[35%] -left-[5%]"
        >
        <img
          src="/images/blue-dotted-line.png"
          alt=""
          class="absolute w-[250vw] top-[70%] -left-[5%]"
        >
      </div>

      <BaseMusicAlbums />
    </div>

    <!-- Decorative footer -->
    <BaseDecorativeFooter />
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'public',
})

const { t } = useI18n()
const route = useRoute()
useSeoCanonical()

useSeoMeta({
  title: () => t('seo.music.title'),
  description: () => t('seo.music.description'),
  ogTitle: () => `${t('seo.music.title')} | Raiders of the Lost Missile`,
  ogDescription: () => t('seo.music.description'),
  ogImage: 'https://rotlm.com/images/OG-image.jpg',
  ogUrl: () => `https://rotlm.com${route.path}`,
  twitterTitle: () => `${t('seo.music.title')} | Raiders of the Lost Missile`,
  twitterDescription: () => t('seo.music.description'),
  twitterImage: 'https://rotlm.com/images/OG-image.jpg',
})
</script>
