<template>
  <section id="band">
    <!-- Black background section -->
    <div class="bg-black pt-6 pb-6">
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

        <!-- Band photo with neon card - uses negative margin to overlap into pink section -->
        <div
          class="relative flex justify-center items-center mt-24 lg:mt-32 mx-auto max-w-4xl mb-[-140px] lg:mb-[-200px] z-10"
        >
          <!-- Image container with green card behind -->
          <div class="relative">
            <!-- Neon green background card -->
            <motion.div
              class="absolute inset-0 w-full h-full bg-green-neon rounded-xl z-0"
              :initial="{ rotate: 0 }"
              :while-in-view="{ rotate: -6 }"
              :viewport="{ once: true, amount: 0.3 }"
              :transition="{ type: 'spring', stiffness: 150, damping: 12 }"
            />
            <!-- Band image -->
            <motion.img
              src="/images/ROTLM_Band.jpg"
              alt="ROTLM Band performing"
              class="relative w-full max-w-[680px] rounded-xl z-[1]"
              :initial="{ rotate: 0 }"
              :while-in-view="{ rotate: 4 }"
              :viewport="{ once: true, amount: 0.3 }"
              :transition="{ type: 'spring', stiffness: 150, damping: 12 }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Primary-500 background section -->
    <div class="bg-primary-500 pt-40 lg:pt-52 pb-0">
      <div class="container">
        <div>
          <h3
            v-motion
            :initial="{ opacity: 0, y: 60 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
            class="text-3xl font-semibold text-black mt-28 text-center uppercase tracking-tight"
          >
            {{ band?.paragraph3 }}
          </h3>
          <!-- Genre logos -->
          <div
            v-if="band?.genres?.length"
            v-motion
            :initial="{ opacity: 0, y: 60 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 200 } }"
            class="grid grid-cols-3 lg:flex lg:justify-between items-center gap-y-6 mt-8"
          >
            <div
              v-for="(genre, index) in band.genres"
              :key="index"
              class="flex items-center justify-center"
            >
              <img
                :src="sanityImageUrl(genre.logo, 200)"
                :alt="genre.name"
                :class="getLogoClass(genre.name)"
              >
            </div>
          </div>
          <div class="mt-6 lg:mt-28 flex flex-col lg:flex-row gap-4">
            <img
              v-if="band?.imageOne"
              :src="sanityImageUrl(band.imageOne)"
              alt=""
              class="max-w-full lg:max-w-[50%] order-2 lg:order-1"
            >
            <motion.img
              v-if="band?.imageTwo"
              :src="sanityImageUrl(band.imageTwo)"
              alt=""
              class="max-w-full lg:max-w-[50%] order-1 lg:order-2"
              :initial="{ rotate: 0 }"
              :while-in-view="{ rotate: [0, -3, 3, -3, 3, -2, 2, 0] }"
              :viewport="{ once: true, amount: 0.3 }"
              :transition="{ duration: 0.6, ease: 'easeInOut' }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
import { motion } from 'motion-v'

const { band } = useBand()

// Logo sizing - adjust each logo individually for visual balance
function getLogoClass(name) {
  const baseName = name?.toLowerCase() || ''

  // Scale adjustments based on visual weight of each logo
  if (baseName.includes('crossover')) { return 'h-8 lg:h-16 w-24' }
  if (baseName.includes('funk')) { return 'h-16 w-16 lg:h-24 lg:w-24' }
  if (baseName.includes('loud')) { return 'h-6 lg:h-8 w-auto' }
  if (baseName.includes('grunge')) { return 'h-10 w-1o lg:h-16 lg:w-24' }
  if (baseName.includes('alt') || baseName.includes('rock')) { return 'h-10 lg:h-12 w-auto' }
  if (baseName.includes('rap')) { return 'h-8 lg:h-10 w-auto' }

  // Default size
  return 'h-8 lg:h-10 w-auto'
}

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
