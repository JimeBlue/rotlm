<template>
  <section v-if="videoSrc" id="hero-video" class="relative w-full h-[70vh] md:h-screen overflow-hidden bg-black">
    <video
      class="absolute inset-0 w-full h-full object-cover"
      :poster="posterSrc"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
    >
      <!-- Phones get a 720px rendition, everything else 1280px; the last source is the fallback -->
      <source :src="videoSrc.mobile" media="(max-width: 767px)">
      <source :src="videoSrc.desktop">
    </video>

    <div class="absolute inset-0 flex items-center justify-center px-4">
      <!-- Inline SVG: no image request, crisp at any size. The box is sized to match
           the old PNG, whose artwork filled ~67% of its width. -->
      <h1 class="w-[47vw] md:w-[30vw] max-w-[600px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
        <RotlmLogo class="w-full h-auto text-white" aria-hidden="true" />
        <span class="sr-only">Raiders of the Lost Missile</span>
      </h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import RotlmLogo from '~/assets/svg/Logo_ROTLM_Initials.svg?component'

const { hero } = useHero()

// Cloudinary delivery URLs look like
//   https://res.cloudinary.com/<cloud>/video/upload/<version>/<public-id>.mp4
// Inserting transformations right after "/upload/" lets Cloudinary scale the clip
// (w_*,c_limit), pick an economical quality/format (q_auto:eco,f_auto) and generate
// a poster from the first frame (so_0). The original upload is ~40 MB, so the
// rendition sizes matter a lot on mobile.
const UPLOAD_SEGMENT = '/video/upload/'
const VIDEO_QUALITY = 'q_auto:eco,f_auto'

function videoRendition(url: string, width: number) {
  return url.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}w_${width},c_limit,${VIDEO_QUALITY}/`)
}

const videoSrc = computed(() => {
  const url = hero.value?.videoUrl
  if (!url) { return undefined }
  if (!url.includes(UPLOAD_SEGMENT)) {
    return { mobile: url, desktop: url }
  }
  return {
    mobile: videoRendition(url, 720),
    desktop: videoRendition(url, 1280),
  }
})

const posterSrc = computed(() => {
  const url = hero.value?.videoUrl
  if (!url || !url.includes(UPLOAD_SEGMENT)) { return undefined }
  return url
    .replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}so_0,w_1280,c_limit,q_auto,f_auto/`)
    .replace(/\.[a-z0-9]+$/i, '.jpg')
})

// The poster is the page's LCP image; preload it at high priority so the
// browser fetches it as soon as the HTML arrives rather than when it reaches
// the <video> element. <video> itself does not support fetchpriority.
useHead(() => ({
  link: posterSrc.value
    ? [{ rel: 'preload', as: 'image', href: posterSrc.value, fetchpriority: 'high' }]
    : [],
}))
</script>
