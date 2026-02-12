<template>
  <section id="hero" class="relative pt-20 lg:pt-16 overflow-hidden bg-black">
    <div class="container mx-auto">
      <motion.div
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{
          delay: 0.1,
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }"
        class="mx-auto w-full max-w-4xl mt-4 lg:mt-10"
      >
        <img
          v-if="phraseImage"
          :src="sanityImageUrl(phraseImage.url)"
          :alt="phraseImage.alt || 'Raiders of the Lost Missile'"
          class="w-full"
        >
      </motion.div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v'

const { hero } = useHero()

const phraseImage = computed(() => hero.value?.images?.[0])
</script>
