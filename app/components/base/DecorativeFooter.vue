<template>
  <section class="relative mt-16 lg:mt-36 overflow-hidden">
    <!-- Cassette decoration -->
    <img
      v-motion
      :initial="{ rotate: 0, opacity: 0 }"
      :visible="{ rotate: -12, opacity: 1, transition: { duration: 800, ease: 'easeOut' } }"
      src="/images/cassette_green.png"
      alt=""
      class="absolute top-6 sm:top-24 md:top-16 -left-6 w-[130px] md:w-[170px] lg:w-[300px] 2xl:w-[400px] pointer-events-none"
    >
    <motion.img
      v-if="footer?.image1"
      :initial="{ opacity: 0, scale: 0 }"
      :in-view="{ opacity: 1, scale: 1 }"
      :transition="{
        delay: 0.1,
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }"
      :src="footer.image1"
      alt="ROTLM Logo"
      class="w-60 sm:w-72 md:w-80 lg:w-[500px] xl:w-[600px] 2xl:w-[650px] 3xl:w-[800px] mx-auto mt-24 md:mt-16"
    />
    <NeonLightning
      class="absolute bottom-0 -right-2 lg:-right-10 text-blue-neon w-20 md:w-[130px] lg:w-[250px] 2xl:w-[350px]"
    />
  </section>
</template>

<script setup>
import { motion } from 'motion-v'
import NeonLightning from '~/assets/svg/neon-lightning.svg?component'

const { footer } = useFooter()
</script>
