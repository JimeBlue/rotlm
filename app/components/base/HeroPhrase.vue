<template>
  <section id="hero-phrase" class="relative overflow-hidden bg-black mt-16 aspect-video lg:aspect-auto lg:h-[60vh] lg:min-h-[360px] lg:max-h-[640px]">
    <!-- Band photo with a dark overlay, starting just under the header like the merch hero.
         The four members span the whole photo, so below lg the box keeps the photo's
         16:9 ratio (nobody cropped); on desktop it is a fixed height and covers.
         The page's LCP image: fetched at high priority in a rendition sized to the viewport. -->
    <img
      v-if="heroImage"
      :src="sanityImageUrl(heroImage.url, 1920)"
      :srcset="sanityImageSrcset(heroImage.url, [768, 1280, 1920, 2560])"
      sizes="100vw"
      :width="sanityImageDimensions(heroImage.url)?.width"
      :height="sanityImageDimensions(heroImage.url)?.height"
      :alt="heroImage.alt || ''"
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover lg:object-[50%_30%]"
    >
    <div class="absolute inset-0 bg-black/60" aria-hidden="true" />

    <div class="relative z-10 flex h-full items-center justify-center container">
      <img
        v-if="phraseImage"
        :src="sanityImageUrl(phraseImage.url)"
        :alt="phraseImage.alt || 'Raiders of the Lost Missile'"
        class="w-4/5 lg:w-full max-w-xl mt-16 lg:mt-48"
      >
    </div>
  </section>
</template>

<script setup>
const { hero } = await useHero()
const { music } = await useMusic()

const heroImage = computed(() => music.value?.heroImage)
const phraseImage = computed(() => hero.value?.images?.[0])
</script>
