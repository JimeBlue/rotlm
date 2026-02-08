<template>
  <div class="relative w-full overflow-hidden rounded-lg aspect-[21/9]">
    <video
      ref="videoEl"
      class="absolute inset-0 w-full h-full object-cover"
      :src="backgroundVideoUrl"
      muted
      loop
      playsinline
      autoplay
    />
    <a
      v-if="videoUrl"
      :href="videoUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="absolute inset-0 flex flex-col items-center justify-center gap-3"
    >
      <PlayArrow class=" w-16 h-16 lg:w-32 lg:h-32 text-green-neon transition-transform hover:scale-110" />
      <span class="text-white font-headline font-bold text-lg lg:text-4xl uppercase tracking-wide">Play Gig</span>
    </a>
  </div>
</template>

<script lang="ts" setup>
import PlayArrow from '~/assets/svg/play-arrow.svg?component'

defineProps<{
  backgroundVideoUrl: string
  videoUrl?: string
}>()
</script>
