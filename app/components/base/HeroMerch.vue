<template>
  <section id="hero-merch" class="relative pt-20 lg:pt-16 overflow-hidden bg-black">
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
          v-if="merchImage"
          :src="sanityImageUrl(merchImage.url)"
          :alt="merchImage.alt || 'Raiders of the Lost Missile'"
          class="w-full"
        >
      </motion.div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v'

const { merch } = useMerch()

const merchImage = computed(() => merch.value?.image)
</script>
