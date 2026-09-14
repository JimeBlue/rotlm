<template>
  <section id="hero-merch" class="relative overflow-hidden bg-black mt-16">
    <!-- Full-width background photo: the page's LCP image, so it is fetched at
         high priority in a rendition sized to the viewport. width/height
         reserve the space so the overlay logo does not jump when it arrives. -->
    <img
      v-if="merchHeroImage"
      :src="sanityImageUrl(merchHeroImage.url)"
      :srcset="sanityImageSrcset(merchHeroImage.url, [768, 1280, 1920, 2560])"
      sizes="100vw"
      :width="sanityImageDimensions(merchHeroImage.url)?.width"
      :height="sanityImageDimensions(merchHeroImage.url)?.height"
      :alt="merchHeroImage.alt || ''"
      fetchpriority="high"
      class="w-full block"
    >
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <div class="container mx-auto">
        <motion.div
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{
            delay: 0.1,
            duration: 0.4,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
          }"
          class="mx-auto w-full max-w-4xl"
        >
          <img
            v-if="merchImage"
            :src="sanityImageUrl(merchImage.url, 1024)"
            :srcset="sanityImageSrcset(merchImage.url, [640, 1024, 1536])"
            sizes="(min-width: 1024px) 896px, 100vw"
            :width="sanityImageDimensions(merchImage.url)?.width"
            :height="sanityImageDimensions(merchImage.url)?.height"
            :alt="merchImage.alt || 'Raiders of the Lost Missile'"
            class="w-full"
          >
        </motion.div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v'

const { merch } = useMerch()

const merchImage = computed(() => merch.value?.image)
const merchHeroImage = computed(() => merch.value?.image2)
</script>
