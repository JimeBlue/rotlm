<template>
  <section id="band" class="bg-black py-6">
    <div class="container mx-auto px-4">
      <!-- Only render when data is loaded -->
      <div
        v-if="band"
        v-motion
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
      >
        <h2 class="text-3xl lg:text-5xl font-bold text-white mb-8 text-center uppercase">
          {{ band.title }}
        </h2>
        <div
          v-motion
          :initial="{ scale: 0.85 }"
          :visible="{
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 350,
              damping: 8,
              delay: 400,
            },
          }"
          class="max-w-3xl space-y-6 text-center mx-auto text-white origin-center"
        >
          <p class="text-lg leading-relaxed">
            {{ band.paragraph1 }}
          </p>
          <!-- Portable Text for rich text with links -->
          <PortableText
            :value="band.paragraph2"
            :components="portableTextComponents"
          />
        </div>
        <div class="mx-auto mt-8 h-1 w-20 bg-yellow-neon" />
        <!-- Band members -->
        <p v-if="band.members?.length" class="text-white text-center mt-6">
          <template v-for="(member, index) in band.members" :key="index">
            <span class="font-bold">{{ member.name }}</span> ({{ member.instrument }})<template v-if="index < band.members.length - 1">
              –
            </template>
          </template>
        </p>
      </div>

      <!-- Band photo with neon card -->
      <div
        class="relative flex justify-center items-center mt-16 mx-auto max-w-4xl min-h-[500px] overflow-hidden"
      >
        <!-- Image container with green card behind -->
        <div class="relative">
          <!-- Neon green background card -->
          <motion.div
            class="absolute inset-0 w-full h-full bg-green-neon rounded-xl z-0"
            :initial="{ rotate: 0 }"
            :while-in-view="{ rotate: -8 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="{ type: 'spring', stiffness: 150, damping: 12 }"
          />
          <!-- Band image -->
          <motion.img
            src="/images/ROTLM_Band.jpg"
            alt="ROTLM Band performing"
            class="relative w-full max-w-[680px] rounded-xl z-[1]"
            :initial="{ rotate: 0 }"
            :while-in-view="{ rotate: 6 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="{ type: 'spring', stiffness: 150, damping: 12 }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
import { motion } from 'motion-v'

const { band } = useBand()

// Custom components for rendering Portable Text
const portableTextComponents = {
  // Render links with styling
  marks: {
    link: ({ value }, { slots }) =>
      h('a', {
        href: value?.href,
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'text-primary-500 hover:text-yellow-neon underline',
      }, slots.default?.()),
  },
  // Render paragraphs with proper styling
  block: {
    normal: (_, { slots }) => h('p', { class: 'text-white text-lg leading-relaxed' }, slots.default?.()),
  },
}
</script>
