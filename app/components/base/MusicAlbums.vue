<template>
  <div>
    <!-- Above the fixed decorative lines on the music page, like the album grid below -->
    <article class="relative z-10">
      <!-- Home page: sticker-style call to action -->
      <BaseCtaTitle v-if="cta" class="mt-16 md:mt-24">
        {{ title || music?.title || 'Music' }}
      </BaseCtaTitle>

      <!-- Music page: section title with underline -->
      <template v-else>
        <h2 class="text-3xl lg:text-5xl font-bold text-white text-center uppercase">
          {{ title || music?.title || 'Music' }}
        </h2>
        <div class="mx-auto mt-4 h-1 w-20 bg-primary-500" />
        <p v-if="music?.description" class="text-xl lg:text-2xl leading-relaxed text-white text-center max-w-3xl mx-auto whitespace-pre-line mt-8">
          {{ music.description }}
        </p>
      </template>
    </article>

    <!-- Albums from Sanity -->
    <div ref="albumsEl" class="relative space-y-16 lg:space-y-24 mt-10 lg:mt-20">
      <div
        v-for="(album) in albums"
        :key="album.title"
        class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
      >
        <!-- Album Cover Image -->
        <div>
          <img
            :src="sanityImageUrl(album.coverImage, 640)"
            :srcset="sanityImageSrcset(album.coverImage, [400, 640, 800, 1024])"
            sizes="(min-width: 1024px) min(50vw, 560px), 100vw"
            :width="sanityImageDimensions(album.coverImage)?.width"
            :height="sanityImageDimensions(album.coverImage)?.height"
            :alt="album.title"
            loading="lazy"
            class="w-full h-auto rounded-lg shadow-2xl"
          >
        </div>

        <!-- Spotify Embed: each iframe boots the whole Spotify player app (~700 KiB).
             On the home page the albums sit far below the fold, so the iframes are
             only mounted once the list scrolls near the viewport (loading="lazy"
             alone is not enough: Chrome starts lazy iframes up to 2500px ahead on
             slow connections, which is the whole home page). On the music page they
             are the content and load immediately.
             The box already has the player's own dark colour and radius, so while
             Spotify boots nothing visibly changes except the content appearing. -->
        <div class="flex min-h-[500px] lg:min-h-0 rounded-xl bg-[#282828]">
          <iframe
            v-if="albumsVisible"
            class="rounded-xl w-full"
            :src="album.spotifyEmbedUrl"
            :title="`Spotify player: ${album.title}`"
            height="100%"
            frameBorder="0"
            allowfullscreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Optional title override (used on the home page); falls back to the Music section title
const props = defineProps({
  title: { type: String, default: '' },
  // Call-to-action style: no underline, spring pop animation (home page)
  cta: { type: Boolean, default: false },
})

const { albums } = useAlbums()
const { music } = useMusic()

const albumsEl = ref()
const albumsVisible = ref(!props.cta)

// Home page only: mount the Spotify players once the album list is within 300px
// of the viewport.
onMounted(() => {
  if (!props.cta || !albumsEl.value) {
    return
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      albumsVisible.value = true
      observer.disconnect()
    }
  }, { rootMargin: '300px' })
  observer.observe(albumsEl.value)
  onUnmounted(() => observer.disconnect())
})

// Spotify's embed page is what every player iframe boots from; warming the
// connection and the browser cache means the players appear almost at once
useHead({
  link: [
    { rel: 'preconnect', href: 'https://open.spotify.com' },
    { rel: 'preconnect', href: 'https://embed-cdn.spotifycdn.com' },
  ],
})
</script>
