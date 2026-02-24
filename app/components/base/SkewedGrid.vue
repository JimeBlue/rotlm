<template>
  <div class="relative overflow-hidden py-12 md:py-24 lg:py-40 xl:py-56">
    <!-- Neon lightning background streaks -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
      aria-hidden="true"
    >
      <NeonLightning
        v-for="(pos, i) in lightningPositions"
        :key="i"
        class="absolute text-green-neon -rotate-[70deg] opacity-25"
        :class="pos"
      />
    </div>
    <div class="relative grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 px-6 md:px-0 md:-rotate-[18deg] md:max-w-4xl lg:max-w-5xl xl:max-w-7xl md:mx-auto">
      <!-- Row 1 spacers (desktop only) -->
      <div class="hidden md:block" />
      <div
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
        class="overflow-hidden rounded-lg aspect-square"
      >
        <img
          :src="sanityImageUrl(images[0], 640)"
          alt="Gallery image 1"
          class="w-full h-full object-cover"
        >
      </div>
      <div class="hidden md:block" />
      <!-- Remaining images -->
      <div
        v-for="(image, index) in images.slice(1)"
        :key="index"
        v-motion
        :initial="animatedSlicedIndices.has(index) ? { opacity: 0, y: 100 } : undefined"
        :visible="animatedSlicedIndices.has(index) ? { opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } } : undefined"
        class="overflow-hidden rounded-lg aspect-square"
      >
        <img
          :src="sanityImageUrl(image, 640)"
          :alt="`Gallery image ${index + 2}`"
          class="w-full h-full object-cover"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import NeonLightning from '~/assets/svg/neon-lightning.svg?component'

defineProps({
  images: {
    type: Array,
    required: true,
  },
})

// Indices in the sliced array (images.slice(1)) that get the slide-up animation:
// Row 2 col 2 (index 1), Row 3 col 2 (index 4), Row 4 col 1 (index 6)
const animatedSlicedIndices = new Set([1, 4, 6])

const lightningPositions = [
  // Top-right
  'w-[400px] md:w-[550px] top-[2%] right-[0%] hidden md:block',
  // Upper-left
  'w-[400px] md:w-[550px] top-[8%] left-[5%]',
  // Middle-left
  'w-[500px] md:w-[700px] top-[30%] -left-[15%] hidden md:block',
  // Center-right
  'w-[500px] md:w-[700px] top-[45%] right-[-5%]',
  // Lower area
  'w-[500px] md:w-[700px] top-[60%] left-[15%] hidden md:block',
  // Bottom-left
  'w-[500px] md:w-[700px] bottom-[-5%] -left-[15%]',
  // Bottom-right
  'w-[500px] md:w-[700px] bottom-[0%] right-[-10%] hidden md:block',
]
</script>
