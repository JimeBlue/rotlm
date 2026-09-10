<template>
  <!-- Full-width live photos carousel: near-square on phones, cinematic 21:9 from md up -->
  <UCarousel
    v-if="slides.length"
    v-slot="{ item }"
    :items="slides"
    dots
    loop
    :autoplay="{ delay: 4000, stopOnInteraction: false }"
    :ui="{
      root: 'w-full bg-black',
      container: 'ms-0',
      item: 'ps-0',
      dots: 'bottom-4 gap-2.5',
      dot: 'size-2.5 bg-white/50 data-[state=active]:bg-white',
    }"
  >
    <picture>
      <source
        :srcset="item.desktop"
        media="(min-width: 768px)"
      >
      <img
        :src="item.mobile"
        :alt="item.alt"
        :loading="item.loading"
        width="900"
        height="900"
        class="block w-full h-auto aspect-square md:aspect-[21/9] object-cover"
      >
    </picture>
  </UCarousel>
</template>

<script setup lang="ts">
const { home } = useHome()

const slides = computed(() =>
  (home.value?.carouselImages || [])
    .filter(img => img.url)
    .map((img, index) => ({
      // Both renditions are cut by Sanity's CDN around the editor's hotspot
      desktop: sanityFocalCropUrl(img, 1920, 823, 75),
      mobile: sanityFocalCropUrl(img, 900, 900, 75),
      alt: img.alt || '',
      loading: index === 0 ? 'eager' : 'lazy',
    })),
)
</script>
