<template>
  <section
    id="hero"
    class="relative pb-28 pt-20 lg:pt-16 overflow-hidden bg-black"
  >
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
        <PhraseLogo class="w-full" />
      </motion.div>
      <div class="mx-auto mt-4 h-1 w-20 bg-primary-500" />

      <motion.img
        :src="image"
        alt="ROTLM Band"
        class="mx-auto mt-12 w-full max-w-4xl rounded-xl will-change-transform"
        :initial="imageInitial"
        :animate="imageAnimate"
        :transition="imageTransition"
      />
    </div>
  </section>
</template>

<script setup>
import { usePreferredReducedMotion } from '@vueuse/core'
import { motion } from 'motion-v'
import PhraseLogo from '~/assets/svg/phrase_logo_white.svg?component'

const props = defineProps({
  image: { type: String, default: '/images/ROTLM_hero.png' },
})

const reduced = usePreferredReducedMotion()

const imageInitial = reduced.value === 'reduce'
  ? { opacity: 1, y: 0, rotate: -5 }
  : {
      opacity: 0,
      y: 100,
      rotate: -6,
      scale: 0.9,
    }

const imageAnimate = { opacity: 1, y: 0, rotate: -5, scale: 1 }

const imageTransition = reduced.value === 'reduce'
  ? { duration: 0 }
  : {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      mass: 1,
    }
</script>
