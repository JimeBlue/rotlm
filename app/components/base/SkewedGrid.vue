<template>
  <div class="overflow-hidden py-12 md:py-24">
    <!-- Mobile: simple 2-col grid -->
    <div class="grid grid-cols-2 gap-2 md:hidden">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="overflow-hidden rounded-lg aspect-square"
      >
        <img
          :src="image"
          :alt="`Gallery image ${index + 1}`"
          class="w-full h-full object-cover"
        >
      </div>
    </div>

    <!-- Tablet+: skewed staggered grid -->
    <div class="hidden md:grid grid-cols-3 gap-4 -rotate-[18deg]">
      <template v-for="(image, index) in images" :key="index">
        <!-- First image: place in col 2 -->
        <div
          v-if="index === 0"
          class="col-start-2 overflow-hidden rounded-lg aspect-square"
        >
          <img
            :src="image"
            :alt="`Gallery image ${index + 1}`"
            class="w-full h-full object-cover"
          >
        </div>
        <!-- Rest: fill naturally -->
        <div
          v-else
          class="overflow-hidden rounded-lg aspect-square"
        >
          <img
            :src="image"
            :alt="`Gallery image ${index + 1}`"
            class="w-full h-full object-cover"
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  images: string[]
}>()
</script>
