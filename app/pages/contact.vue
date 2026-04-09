<template>
  <div id="contact" class="bg-black text-white min-h-screen">
    <!-- Fixed right panel (desktop only) -->
    <div class="hidden xl:flex fixed top-20 right-0 w-1/2 h-[calc(100vh-5rem)] overflow-hidden">
      <img
        src="/images/contact-poster-desktop.png"
        alt="ROTLM"
        class="w-full h-full object-contain ken-burns"
      >
    </div>

    <!-- Scrollable left content -->
    <div class="xl:w-1/2 pt-28 xl:pt-32 pb-24 px-8 space-y-16 flex flex-col items-center">
      <div class="space-y-8">
        <!-- Poster-style title -->
        <div class="font-black uppercase leading-none text-white font-body w-fit mx-auto">
          <div class="text-6xl tracking-wide text-center">
            {{ $t('contact.hero.line1') }}
          </div>
          <div class="text-6xl tracking-wide text-center">
            {{ $t('contact.hero.line2_before') }} {{ $t('contact.hero.line2_after') }}
          </div>
          <div class="text-6xl tracking-wide text-center">
            {{ $t('contact.hero.line3_before') }}{{ $t('contact.hero.line3_after') }}
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
            {{ $t('contact.hero.subtitle') }}
          </p>
        </div>
      </div>
      <!-- Contact form -->
      <div class="w-full max-w-lg">
        <ContactForm mode="contact" />
      </div>

      <!-- Mobile image -->
      <div class="xl:hidden">
        <img src="/images/contact-poster.png" alt="ROTLM" class="w-full">
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
</script>
