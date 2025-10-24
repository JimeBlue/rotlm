<template>
  <div class="flex flex-1 flex-col" :class="[bg]">
    <!-- <img
      src="https://images.pexels.com/videos/852107/free-video-852107.jpg"
      class="fixed bottom-0 right-0 z-0 min-h-screen min-w-full object-cover"
      :class="[bg]"
    > -->
    <!-- <video
      src="https://videos.pexels.com/video-files/852107/852107-hd_1920_1080_30fps.mp4"
      muted
      onloadedmetadata="this.muted = true"
      loop
      playsinline
      autoplay
      class="fixed bottom-0 right-0 z-0 min-h-screen min-w-full object-cover"
      :class="[bg]"
    /> -->
    <div class="flex flex-1 flex-col items-center justify-center">
      <div class="relative mx-auto w-full max-w-md px-1 md:px-3">
        <div
          class="shadow-primary-50/10 space-y-14 rounded-2xl bg-white p-4 py-12 shadow-md ring-1 ring-gray-950/10 md:space-y-12 md:p-8"
        >
          <Logo class="mx-auto h-14" />
          <AppLogin />
        </div>
      </div>
    </div>
    <AppFooter class="border-none text-center" />
  </div>
</template>

<script setup>
import Logo from '~/assets/svg/starter-pro-logo.svg?component'

definePageMeta({
  layout: 'blank',
})

const bg = 'bg-gray-50' // 'bg-linear-to-b from-primary/10 to-primary/50',
</script>
