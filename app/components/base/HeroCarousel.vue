<template>
  <section id="hero-carousel" class="relative w-full h-[60vh] md:h-screen overflow-hidden bg-black mt-16">
    <UCarousel
      v-slot="{ item }"
      :items="images"
      arrows
      loop
      :autoplay="{ delay: 5000, stopOnInteraction: false }"
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :prev="{ variant: 'link', color: 'neutral', size: 'xl', ui: { leadingIcon: 'size-10 shrink-0' }, class: 'text-white hover:text-white/70 active:text-white/70 focus-visible:ring-0' }"
      :next="{ variant: 'link', color: 'neutral', size: 'xl', ui: { leadingIcon: 'size-10 shrink-0' }, class: 'text-white hover:text-white/70 active:text-white/70 focus-visible:ring-0' }"
      :ui="{
        root: 'w-full h-full',
        viewport: 'w-full h-full overflow-hidden',
        container: 'h-full',
        item: 'basis-full h-full',
        prev: 'absolute rounded-full z-10 !start-4 top-1/2 -translate-y-1/2',
        next: 'absolute rounded-full z-10 !end-4 top-1/2 -translate-y-1/2',
      }"
    >
      <img
        :src="item.src"
        :alt="item.alt"
        class="w-full h-full object-cover object-top"
      >
    </UCarousel>
  </section>
</template>

<script setup lang="ts">
const { hero } = useHero()

const images = computed(() =>
  (hero.value?.carouselImages || [])
    .filter(img => img.url)
    .map(img => ({
      src: `/api/sanity/image-proxy?url=${encodeURIComponent(sanityImageUrl(img.url, 1920, 80))}`,
      alt: img.alt || '',
    })),
)
</script>
