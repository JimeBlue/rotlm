<template>
  <section id="music" class="relative pb-16 md:pb-24 lg:mb-32">
    <BaseHeroPhrase />
    <div class="container">
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
          class="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          <!-- Album Cover Image -->
          <div class="relative z-10">
            <img
              :src="album.coverImage"
              :alt="album.title"
              class="w-full h-auto rounded-lg shadow-2xl"
            >
          </div>

          <!-- Spotify Embed -->
          <div class="relative z-10 flex min-h-[500px] lg:min-h-0">
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
      <!-- NOTE: music page footer -->
      <footer class="relative mt-16 lg:mt-36">
        <!-- Cassette decoration -->
        <img
          v-motion
          :initial="{ rotate: 0, opacity: 0 }"
          :visible="{ rotate: -12, opacity: 1, transition: { duration: 800, ease: 'easeOut' } }"
          src="/images/cassette_green.png"
          alt=""
          class="absolute top-6 sm:top-24 -left-28 sm:-left-36 md:-left-48 lg:-left-52 xl:-left-56 w-[200px] sm:w-[250px] md:w-[310px] lg:w-[380px] -translate-y-1/2 pointer-events-none"
        >
        <motion.img
          :initial="{ opacity: 0, scale: 0 }"
          :in-view="{ opacity: 1, scale: 1 }"
          :transition="{
            delay: 0.1,
            duration: 0.4,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
          }"
          src="/images/Logo_ROTLM_with_guitar_white.png"
          alt="ROTLM Logo"
          class="w-3/6 mx-auto mt-24"
        />
        <BrandmarkDown
          class="absolute bottom-0 right-0 sm:-right-6 md:-right-16 lg:-right-16 translate-x-1/2 translate-y-1/4 text-blue-neon w-[150px] md:w-[220px] lg:w-[520px]"
        />
      </footer>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v'
import BrandmarkDown from '~/assets/svg/neon-lightning.svg?component'

const { albums } = useAlbums()
const { music } = useMusic()

definePageMeta({
  layout: 'public',
})
</script>
