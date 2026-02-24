<template>
  <section id="music" class="relative pb-16 md:pb-24 lg:mb-32">
    <BaseHeroPhrase />
    <div class="container" style="clip-path: inset(0 -100vw)">
      <!-- Decorative fixed pink lines (clipped to container section) -->
      <div class="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img
          src="/images/blue-dotted-line.png"
          alt=""
          class="absolute w-[250vw] top-[35%] -left-[5%]"
        >
        <img
          src="/images/blue-dotted-line.png"
          alt=""
          class="absolute w-[250vw] top-[70%] -left-[5%]"
        >
      </div>

      <article>
        <h2
          v-motion
          :initial="{ opacity: 0, y: 80 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
          class="text-3xl lg:text-5xl font-bold text-white text-center uppercase mt-16 lg:mt-24"
        >
          {{ music?.title || 'Music' }}
        </h2>
        <div class="mx-auto mt-4 h-1 w-20 bg-primary-500" />
      </article>

      <!-- Albums from Sanity -->
      <div class="relative space-y-16 lg:space-y-24 mt-10 lg:mt-20">
        <div
          v-for="(album) in albums"
          :key="album.title"
          class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          <!-- Album Cover Image -->
          <div>
            <img
              :src="sanityImageUrl(album.coverImage)"
              :alt="album.title"
              class="w-full h-auto rounded-lg shadow-2xl"
            >
          </div>

          <!-- Spotify Embed -->
          <div class="flex min-h-[500px] lg:min-h-0">
            <iframe
              class="rounded-xl w-full"
              :src="album.spotifyEmbedUrl"
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

    <!-- Decorative footer -->
    <BaseDecorativeFooter />
  </section>
</template>

<script setup>
const { albums } = useAlbums()
const { music } = useMusic()

definePageMeta({
  layout: 'public',
})
</script>
