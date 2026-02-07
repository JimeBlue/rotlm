<template>
  <div
    class="rounded-lg py-6 px-8 bg-black/60 relative overflow-hidden mb-6 border"
    :class="[
      isOdd
        ? 'border-blue-neon shadow-[0_0_15px_rgba(6,93,213,0.4),0_0_40px_rgba(6,93,213,0.15),inset_0_0_20px_rgba(6,93,213,0.05)]'
        : 'border-primary-500 shadow-[0_0_15px_rgba(253,1,72,0.4),0_0_40px_rgba(253,1,72,0.15),inset_0_0_20px_rgba(253,1,72,0.05)]'
    ]"
  >
    <!-- Corner glow -->
    <div
      class="absolute inset-0 rounded-[inherit] pointer-events-none"
      :class="[
        isOdd
          ? 'bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,93,213,0.15)_0%,transparent_60%)]'
          : 'bg-[radial-gradient(ellipse_at_bottom_right,rgba(253,1,72,0.15)_0%,transparent_60%)]'
      ]"
    />

    <div class="relative z-10 flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
      <!-- Date section -->
      <div class="text-center md:w-28 md:shrink-0">
        <template v-if="dateParts.length >= 4">
          <p class="text-sm font-medium text-white/80">{{ dateParts[0] }}</p>
          <p :class="['text-4xl font-bold', isOdd ? 'text-blue-neon' : 'text-primary-500']">{{ dateParts[1] }}</p>
          <p class="text-sm text-white/80">{{ dateParts[2] }}</p>
          <p class="text-sm text-white/80">{{ dateParts[3] }}</p>
        </template>
        <template v-else>
          <p class="text-sm font-medium text-white/80">{{ displayDate }}</p>
        </template>
      </div>

      <!-- Vertical neon divider -->
      <div
        class="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-current to-transparent"
        :style="{
          color: dividerColor,
          boxShadow: `0 0 10px ${dividerGlow}`
        }"
      />

      <!-- Venue + City/Time section -->
      <div class="text-center md:text-left flex-1">
        <h3 class="text-xl md:text-2xl font-bold text-white uppercase font-body">{{ venue }}</h3>
        <div class="flex items-center gap-4 mt-3 justify-center md:justify-start">
          <p class="text-white/80">{{ city }}</p>
          <p v-if="time" class="text-white/80">{{ time }}</p>
        </div>
      </div>

      <!-- Address + Button section -->
      <div
        v-if="address || venueLink"
        class="flex flex-col md:flex-row items-center gap-4 md:gap-6"
      >
        <a
          v-if="address && googleMapsLink"
          :href="googleMapsLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-white underline underline-offset-4 hover:text-white/80 transition-colors"
        >
          {{ address }}
        </a>
        <span v-else-if="address" class="text-sm text-white/70">
          {{ address }}
        </span>
        <a
          v-if="venueLink && buttonText"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

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

const props = defineProps<Props>()

const isOdd = computed(() => props.index % 2 === 0)

const neonColor = computed(() => isOdd.value ? '#065dd5' : '#fd0148')
const neonRgba = computed(() => isOdd.value ? '6, 93, 213' : '253, 1, 72')

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
