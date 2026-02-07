<template>
  <div class="border-t border-white/20 py-8 md:py-6 last:border-b">
    <div class="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
      <!-- Date section -->
      <div class="text-center md:w-28 md:shrink-0">
        <template v-if="dateParts.length >= 4">
          <p class="text-sm font-medium text-white/80">{{ dateParts[0] }}</p>
          <p class="text-4xl font-bold text-white">{{ dateParts[1] }}</p>
          <p class="text-sm text-white/80">{{ dateParts[2] }}</p>
          <p class="text-sm text-white/80">{{ dateParts[3] }}</p>
        </template>
        <template v-else>
          <p class="text-sm font-medium text-white/80">{{ displayDate }}</p>
        </template>
      </div>

      <!-- Venue + City/Time section -->
      <div class="text-center md:text-left flex-1">
        <h3 class="text-xl md:text-2xl font-bold text-white uppercase font-body">{{ venue }}</h3>
        <div class="mt-3">
          <p class="font-bold text-white">{{ city }}</p>
          <p v-if="time" class="text-sm text-white/70 mt-0.5">{{ time }}</p>
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
          class="inline-block rounded-none border border-white px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
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

const dateParts = computed(() => {
  return props.displayDate.split(' ').filter(Boolean)
})
</script>
