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
        class="mx-auto w-full max-w-4xl mt-4 lg:mt-10"
      >
        <img
          v-if="phraseImage"
          :src="phraseImage.url"
          :alt="phraseImage.alt || 'Raiders of the Lost Missile'"
          class="w-full"
        >
      </motion.div>
      <div class="mx-auto mt-4 h-1 w-20 bg-primary-500" />

      <div class="relative mx-auto mt-12 w-full max-w-4xl">
        <RotlmLogo class="absolute -bottom-10 md:top-2 lg:top-6 -right-10 md:-left-5  w-28 md:w-36 lg:w-32 z-20 text-primary-500 md:block  animate-spin-slow" />
        <motion.img
          :src="image"
          alt="ROTLM Band"
          class="relative z-10 w-full rounded-xl will-change-transform"
          :initial="imageInitial"
          :animate="imageAnimate"
          :transition="imageTransition"
        />
      </div>
    </div>

    <!-- Decorative images - visible from lg screens -->
    <Brandmark
      class="absolute bottom-36 left-0 hidden -translate-x-1/2 translate-y-1/4 lg:block text-yellow-neon lg:w-[720px]"
    />
    <BrandmarkDown
      class="absolute bottom-48 right-10 hidden translate-x-1/2 translate-y-1/4 text-primary-500 lg:block lg:w-[520px]"
    />
  </section>
</template>

<script setup>
import { usePreferredReducedMotion } from '@vueuse/core'
import { motion } from 'motion-v'
import BrandmarkDown from '~/assets/svg/bandmark_down.svg?component'
import Brandmark from '~/assets/svg/brandmark.svg?component'
import RotlmLogo from '~/assets/svg/ROTLM_logo.svg?component'

const props = defineProps({
  image: { type: String, default: '/images/ROTLM_hero.png' },
})

const { hero } = useHero()

const phraseImage = computed(() => hero.value?.images?.[0])

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
