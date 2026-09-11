<template>
  <section v-if="videoSrc" id="hero-video" class="relative w-full h-[70vh] md:h-screen overflow-hidden bg-black">
    <video
      class="absolute inset-0 w-full h-full object-cover"
      :src="videoSrc"
      :poster="posterSrc"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
    />

    <div class="absolute inset-0 flex items-center justify-center px-4">
      <h1 class="w-[70vw] md:w-[45vw] max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
        <img
          src="/images/rotlm_logo_white_bg_transparent-640.png"
          srcset="
            /images/rotlm_logo_white_bg_transparent-320.png  320w,
            /images/rotlm_logo_white_bg_transparent-480.png  480w,
            /images/rotlm_logo_white_bg_transparent-640.png  640w,
            /images/rotlm_logo_white_bg_transparent.png     1024w
          "
          sizes="(min-width: 768px) min(45vw, 896px), 70vw"
          alt="Raiders of the Lost Missile"
          width="1024"
          height="1024"
          fetchpriority="high"
          class="w-full h-auto"
        >
      </h1>
    </div>
  </section>
</template>

<script setup lang="ts">
const { hero } = useHero()

// Cloudinary delivery URLs look like
//   https://res.cloudinary.com/<cloud>/video/upload/<version>/<public-id>.mp4
// Inserting transformations right after "/upload/" lets Cloudinary pick the best
// quality/format (q_auto,f_auto) and generate a poster from the first frame (so_0).
const UPLOAD_SEGMENT = '/video/upload/'

const videoSrc = computed(() => {
  const url = hero.value?.videoUrl
  if (!url) { return undefined }
  return url.includes(UPLOAD_SEGMENT)
    ? url.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}q_auto,f_auto/`)
    : url
})

const posterSrc = computed(() => {
  const url = hero.value?.videoUrl
  if (!url || !url.includes(UPLOAD_SEGMENT)) { return undefined }
  return url
    .replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}so_0,w_1280,c_limit,q_auto,f_auto/`)
    .replace(/\.[a-z0-9]+$/i, '.jpg')
})
</script>
