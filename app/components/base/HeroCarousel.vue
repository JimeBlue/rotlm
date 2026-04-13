<template>
  <section id="hero-carousel" class="relative w-full md:h-screen overflow-hidden bg-black mt-16">
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
        root: 'w-full md:h-full',
        viewport: 'w-full md:h-full overflow-hidden',
        container: 'md:h-full',
        item: 'basis-full md:h-full',
        prev: 'absolute rounded-full z-10 !start-4 top-1/2 -translate-y-1/2',
        next: 'absolute rounded-full z-10 !end-4 top-1/2 -translate-y-1/2',
      }"
    >
      <img
        :src="item.src"
        :alt="item.alt"
        :loading="item.loading"
        class="w-full h-auto md:h-full md:object-cover md:object-center"
      >
    </UCarousel>
  </section>
</template>

<script setup lang="ts">
const { hero } = useHero()

const images = computed(() =>
  (hero.value?.carouselImages || [])
    .filter(img => img.url)
    .map((img, index) => ({
      src: `/api/sanity/image-proxy?url=${encodeURIComponent(sanityImageUrl(img.url, 1920, 80))}`,
      alt: img.alt || '',
      loading: index === 0 ? 'eager' : 'lazy',
    })),
)
</script>
