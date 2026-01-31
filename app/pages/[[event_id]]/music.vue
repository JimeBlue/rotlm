<template>
  <section id="music" class="bg-black min-h-screen py-16 lg:py-24">
    <div class="container mx-auto px-4">
      <h1
        v-motion
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
        class="text-3xl lg:text-5xl font-bold text-white mb-12 text-center uppercase"
      >
        Music
      </h1>

      <!-- Albums from Sanity -->
      <div class="space-y-16 lg:space-y-24">
        <div
          v-for="(album, index) in albums"
          :key="album.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 200 + index * 100 } }"
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          <!-- Album Cover Image -->
          <div>
            <img
              :src="album.coverImage"
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
  </section>
</template>

<script setup>
const { albums } = useAlbums()

definePageMeta({
  layout: 'public',
})
</script>
