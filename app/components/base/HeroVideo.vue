<template>
  <section v-if="videoSrc" id="hero-video" class="relative w-full h-[70vh] md:h-screen overflow-hidden bg-black">
    <!-- The poster is a plain <img> (the page's LCP element) rather than the
         <video poster> so it paints immediately and stays visible underneath
         while the deferred video fades in on top. -->
    <img
      v-if="posterSrc"
      ref="posterEl"
      :src="posterSrc"
      alt=""
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover"
      @load="startVideo"
      @error="startVideo"
    >
    <video
      ref="videoEl"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
      :class="playing ? 'opacity-100' : 'opacity-0'"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      @playing="playing = true"
    >
      <!-- Sources are only attached once the poster is on screen (see below).
           Phones get 720px, tablets/laptops 1280px, big screens 1920px; the last source is the fallback -->
      <template v-if="videoReady">
        <source :src="videoSrc.mobile" media="(max-width: 767px)">
        <source :src="videoSrc.desktop" media="(max-width: 1535px)">
        <source :src="videoSrc.large">
      </template>
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
// (w_*,c_limit), pick a quality tier and format (q_auto:*,f_auto) and generate
// a poster from the first frame (so_0). The original upload is ~40 MB, so the
// rendition sizes matter a lot on mobile; phones get the "eco" tier, larger
// screens "good" so the clip does not look blocky when it fills a monitor.
const UPLOAD_SEGMENT = '/video/upload/'

function videoRendition(url: string, width: number, quality: 'eco' | 'good') {
  return url.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}w_${width},c_limit,q_auto:${quality},f_auto/`)
}

const videoSrc = computed(() => {
  const url = hero.value?.videoUrl
  if (!url) { return undefined }
  if (!url.includes(UPLOAD_SEGMENT)) {
    return { mobile: url, desktop: url, large: url }
  }
  return {
    mobile: videoRendition(url, 720, 'eco'),
    desktop: videoRendition(url, 1280, 'good'),
    large: videoRendition(url, 1920, 'good'),
  }
})

const posterSrc = computed(() => {
  const url = hero.value?.videoUrl
  if (!url || !url.includes(UPLOAD_SEGMENT)) { return undefined }
  return url
    .replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}so_0,w_1280,c_limit,q_auto,f_auto/`)
    .replace(/\.[a-z0-9]+$/i, '.jpg')
})

// The host serving the poster and the video (res.cloudinary.com)
const mediaOrigin = computed(() => {
  const url = hero.value?.videoUrl
  if (!url) {
    return undefined
  }
  try {
    return new URL(url).origin
  }
  catch {
    return undefined
  }
})

// The poster is the page's LCP image; preload it at high priority so the
// browser fetches it as soon as the HTML arrives rather than when it reaches
// the <img> element. The preconnect gets the DNS lookup and TLS handshake to
// the media host out of the way at the same time, so the video request that
// follows does not pay for them.
useHead(() => ({
  link: [
    ...(mediaOrigin.value ? [{ rel: 'preconnect', href: mediaOrigin.value }] : []),
    ...(posterSrc.value
      ? [{ rel: 'preload', as: 'image', href: posterSrc.value, fetchpriority: 'high' }]
      : []),
  ],
}))

// The clip is a few megabytes. Started at parse time it competes with the
// poster, which is the LCP image, so the sources are attached only once the
// poster is on screen (or right away if there is no poster). Until the video
// can play, users see the poster - the clip's own first frame - and the video
// fades in over it.
const videoEl = ref<HTMLVideoElement>()
const posterEl = ref<HTMLImageElement>()
const videoReady = ref(false)
const playing = ref(false)

function startVideo() {
  if (videoReady.value) {
    return
  }
  videoReady.value = true
  // Sources added after the element was created are only picked up by load()
  nextTick(() => {
    videoEl.value?.load()
    videoEl.value?.play().catch(() => {})
  })
}

onMounted(() => {
  // No poster to wait for, or the poster came from the cache and fired its
  // load event before this component was mounted
  if (!posterSrc.value || posterEl.value?.complete) {
    startVideo()
    return
  }
  // Backstop: if the poster's events never arrive, start no later than the
  // page's load event, as before
  if (document.readyState === 'complete') {
    startVideo()
  }
  else {
    window.addEventListener('load', startVideo, { once: true })
  }
})
</script>
