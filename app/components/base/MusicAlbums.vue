<template>
  <div>
    <article>
      <!-- Home page: sticker-style call to action -->
      <BaseCtaTitle v-if="cta" class="mt-16 md:mt-24">
        {{ title || music?.title || 'Music' }}
      </BaseCtaTitle>

      <!-- Music page: section title with underline -->
      <template v-else>
        <h2
          v-motion
          :initial="{ opacity: 0, y: 80 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
          class="text-3xl lg:text-5xl font-bold text-white text-center uppercase mt-16 lg:mt-24"
        >
          {{ title || music?.title || 'Music' }}
        </h2>
        <div class="mx-auto mt-4 h-1 w-20 bg-primary-500" />
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

        <!-- Spotify Embed: each iframe boots the whole Spotify player app (~700 KiB),
             so it is only mounted once the albums scroll near the viewport.
             loading="lazy" alone is not enough: Chrome starts lazy iframes up to
             2500px ahead on slow connections, which is the whole home page. -->
        <div class="flex min-h-[500px] lg:min-h-0">
          <iframe
            v-if="albumsVisible"
            class="rounded-xl w-full"
            :src="album.spotifyEmbedUrl"
            :title="`Spotify player: ${album.title}`"
            height="100%"
            frameBorder="0"
            allowfullscreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Optional title override (used on the home page); falls back to the Music section title
defineProps({
  title: { type: String, default: '' },
  // Call-to-action style: no underline, spring pop animation (home page)
  cta: { type: Boolean, default: false },
})

const { albums } = useAlbums()
const { music } = useMusic()

const albumsEl = ref()
const albumsVisible = ref(false)

// Mount the Spotify players once the album list is within 300px of the viewport
const { stop } = useIntersectionObserver(albumsEl, ([entry]) => {
  if (entry?.isIntersecting) {
    albumsVisible.value = true
    stop()
  }
}, { rootMargin: '300px' })
</script>
