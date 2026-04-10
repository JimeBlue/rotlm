<template>
  <section id="hero-merch" class="relative overflow-hidden bg-black mt-16">
    <img
      v-if="merchHeroImage"
      :src="sanityImageUrl(merchHeroImage.url)"
      :alt="merchHeroImage.alt || ''"
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
            :src="sanityImageUrl(merchImage.url)"
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
