<template>
  <div
    class="rounded-lg py-6 px-8 bg-[#0d0a12] relative mb-6 border"
    :class="[
      isOdd
        ? 'border-cyan-neon shadow-[0_0_15px_rgba(6,182,212,0.4),0_0_40px_rgba(6,182,212,0.15)]'
        : 'border-pink-neon shadow-[0_0_15px_rgba(236,72,153,0.4),0_0_40px_rgba(236,72,153,0.15)]',
    ]"
  >
    <div class="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
      <!-- Date section -->
      <div class="text-center md:w-28 md:shrink-0">
        <template v-if="dateParts.length >= 4">
          <p class="text-sm font-medium text-white">
            {{ dateParts[0] }}
          </p>
          <p class="text-4xl font-bold" :class="[isOdd ? 'text-cyan-neon' : 'text-pink-neon']">
            {{ dateParts[1] }}
          </p>
          <p class="text-sm text-white">
            {{ dateParts[2] }}
          </p>
          <p class="text-sm text-white">
            {{ dateParts[3] }}
          </p>
        </template>
        <template v-else>
          <p class="text-sm font-medium text-white">
            {{ displayDate }}
          </p>
        </template>
      </div>

      <!-- Vertical neon divider -->
      <div
        class="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-current to-transparent"
        :style="{
          color: dividerColor,
          boxShadow: `0 0 10px ${dividerGlow}`,
        }"
      />

      <!-- Venue + City/Time section -->
      <div class="text-center md:text-left flex-1">
        <h3 class="text-xl md:text-2xl font-bold text-white uppercase font-body">
          {{ venue }}
        </h3>
        <div class="flex items-center gap-4 mt-3 justify-center md:justify-start">
          <p class="text-white">
            {{ city }}
          </p>
          <p v-if="time" class="text-white">
            {{ time }}
          </p>
        </div>
        <a
          v-if="address && googleMapsLink"
          :href="googleMapsLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-white underline underline-offset-4 hover:text-white/70 transition-colors mt-2 inline-block"
        >
          {{ address }}
        </a>
        <span v-else-if="address" class="text-sm text-white mt-2 block">
          {{ address }}
        </span>
      </div>

      <!-- Button section -->
      <a
        v-if="venueLink"
        :href="venueLink"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-shrink-0 px-6 py-3 border-2 transition-all duration-300 hover:scale-105 text-sm font-medium"
        :style="buttonStyle"
        @mouseenter="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.boxShadow = buttonHoverShadow"
        @mouseleave="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.boxShadow = buttonShadow"
      >
        {{ buttonText }}
      </a>
      <span
        v-else
        class="flex-shrink-0 px-6 py-3 border-2 text-sm font-medium opacity-60 cursor-not-allowed"
        :style="buttonStyle"
      >
        {{ t('gigs.more_info_soon') }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<Props>()

const { t } = useI18n()

interface Props {
  index: number
  displayDate: string
  venue: string
  city: string
  time?: string
  address?: string
  googleMapsLink?: string
  venueLink?: string
  buttonText?: string
}

const isOdd = computed(() => props.index % 2 === 0)

const neonColor = computed(() => isOdd.value ? '#06b6d4' : '#ec4899')
const neonRgba = computed(() => isOdd.value ? '6, 182, 212' : '236, 72, 153')

const dividerColor = computed(() => neonColor.value)
const dividerGlow = computed(() => `rgba(${neonRgba.value}, 0.8)`)

const buttonShadow = computed(() => `0 0 20px rgba(${neonRgba.value}, 0.4)`)
const buttonHoverShadow = computed(() => `0 0 30px rgba(${neonRgba.value}, 0.8), inset 0 0 20px rgba(${neonRgba.value}, 0.2)`)
const buttonStyle = computed(() => ({
  color: '#fff',
  borderColor: neonColor.value,
  boxShadow: buttonShadow.value,
  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
}))

const dateParts = computed(() => {
  return props.displayDate.split(' ').filter(Boolean)
})
</script>
