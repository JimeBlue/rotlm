<template>
  <div ref="containerEl" class="relative w-full overflow-hidden rounded-lg aspect-[21/9]">
    <video
      ref="videoEl"
      class="absolute inset-0 w-full h-full object-cover"
      :src="videoSrc"
      :poster="optimizedPoster"
      preload="none"
      muted
      loop
      playsinline
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

const props = defineProps<{
  backgroundVideoUrl: string
  videoUrl?: string
  posterUrl?: string
}>()

const optimizedPoster = computed(() => {
  if (!props.posterUrl) return undefined
  return `${props.posterUrl}?w=1280&q=75&fm=webp`
})

const containerEl = ref<HTMLElement>()
const videoEl = ref<HTMLVideoElement>()
const videoSrc = ref<string>()

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        videoSrc.value = props.backgroundVideoUrl
        nextTick(() => videoEl.value?.play())
        observer.disconnect()
      }
    },
    { rootMargin: '200px' },
  )

  if (containerEl.value) {
    observer.observe(containerEl.value)
  }

  onUnmounted(() => observer.disconnect())
})
</script>
