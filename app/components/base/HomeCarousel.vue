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
      dots: 'bottom-2 gap-0',
      // 24px hit area for touch targets; the visible 10px dot is drawn by the pseudo-element
      dot: 'size-6 flex items-center justify-center bg-transparent data-[state=active]:bg-transparent before:size-2.5 before:rounded-full before:bg-white/50 data-[state=active]:before:bg-white before:transition',
    }"
  >
    <picture>
      <source
        :srcset="item.desktopSrcset"
        sizes="100vw"
        media="(min-width: 768px)"
      >
      <img
        :src="item.mobile"
        :srcset="item.mobileSrcset"
        sizes="100vw"
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
import type { SanityCropImage } from '~/utils/sanityImage'

const { home } = useHome()

// Slides are full-bleed, so offer a few widths per breakpoint (21:9 from md up, square below)
const DESKTOP_WIDTHS = [1024, 1280, 1600, 1920]
const MOBILE_WIDTHS = [450, 640, 900]

function focalSrcset(img: SanityCropImage, widths: number[], aspect: number) {
  return widths
    .map(w => `${sanityFocalCropUrl(img, w, Math.round(w / aspect), 75)} ${w}w`)
    .join(', ')
}

const slides = computed(() =>
  (home.value?.carouselImages || [])
    .filter(img => img.url)
    .map((img, index) => ({
      // All renditions are cut by Sanity's CDN around the editor's hotspot
      desktopSrcset: focalSrcset(img, DESKTOP_WIDTHS, 21 / 9),
      mobile: sanityFocalCropUrl(img, 640, 640, 75),
      mobileSrcset: focalSrcset(img, MOBILE_WIDTHS, 1),
      alt: img.alt || '',
      loading: index === 0 ? 'eager' : 'lazy',
    })),
)
</script>
