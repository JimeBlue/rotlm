<template>
  <div id="contact" class="bg-black text-white min-h-screen">
    <!-- Fixed right panel (desktop only) -->
    <div class="hidden xl:flex fixed top-20 right-0 w-1/2 h-[calc(100vh-5rem)] overflow-hidden">
      <img
        :src="contact?.posterDesktop"
        alt=""
        class="w-full h-full object-contain ken-burns"
      >
    </div>

    <!-- Scrollable left content -->
    <div class="xl:w-1/2 pt-28 xl:pt-32 pb-24 px-8 space-y-16 flex flex-col items-center">
      <div class="space-y-8">
        <!-- Poster-style title -->
        <div class="font-black uppercase leading-none text-white font-body max-w-xs mx-auto">
          <div class="text-6xl tracking-wide text-center">
            {{ contact?.title }}
          </div>
          <motion.div
            :initial="{ opacity: 0, scale: 0 }"
            :while-in-view="{ opacity: 1, scale: 1 }"
            :viewport="{ once: true }"
            :transition="{
              delay: 0.1,
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }"
            class="flex justify-center pt-2"
          >
            <RotlmLogo class="w-40 h-auto text-yellow-neon" />
          </motion.div>
        </div>

        <div class="space-y-6 max-w-lg text-center">
          <p class="text-lg leading-relaxed">
            <template v-for="(part, i) in textParts" :key="i"><a v-if="part.email" :href="`mailto:${part.text}`" class="text-yellow-neon underline hover:text-white">{{ part.text }}</a><template v-else>{{ part.text }}</template></template>
          </p>
        </div>
      </div>
      <!-- Contact form -->
      <div class="w-full max-w-lg">
        <ContactForm />
      </div>

      <!-- Mobile image -->
      <div class="xl:hidden">
        <img :src="contact?.posterMobile" alt="" class="w-full">
      </div>
    </div>
  </div>
</template>

<script setup>
import { motion } from 'motion-v'
import RotlmLogo from '~/assets/svg/Logo_ROTLM_Initials.svg?component'

definePageMeta({
  layout: 'contact',
})

const { contact } = useContact()
const { t } = useI18n()

// Any email address written in the Sanity text is rendered as a mailto link
const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/g

const textParts = computed(() => {
  const text = contact.value?.text || ''
  const parts = []
  let lastIndex = 0
  for (const match of text.matchAll(EMAIL_PATTERN)) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index) })
    }
    parts.push({ text: match[0], email: true })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex) })
  }
  return parts
})
const route = useRoute()
useSeoCanonical()

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description'),
  ogTitle: () => `${t('seo.contact.title')} | Raiders of the Lost Missile`,
  ogDescription: () => t('seo.contact.description'),
  ogImage: 'https://rotlm.com/images/OG-image.jpg',
  ogUrl: () => `https://rotlm.com${route.path}`,
  twitterTitle: () => `${t('seo.contact.title')} | Raiders of the Lost Missile`,
  twitterDescription: () => t('seo.contact.description'),
  twitterImage: 'https://rotlm.com/images/OG-image.jpg',
})
</script>
