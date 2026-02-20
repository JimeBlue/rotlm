<template>
  <section class="relative overflow-hidden h-72 lg:h-[400px] flex items-center justify-center">
    <!-- Background image (image3 from Sanity) -->
    <img
      v-if="bgImage"
      :src="bgImage"
      alt=""
      class="absolute inset-0 w-full h-full object-cover object-center"
    >

    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-black/55" />

    <!-- Animated images — pop in one after another, hard-cut exit -->
    <div class="relative z-10 flex items-center justify-center w-56 lg:w-80">
      <img
        v-if="current === 0 && animImages[0]"
        key="img-0"
        v-motion
        :initial="{ scale: 0.5, opacity: 1 }"
        :enter="{
          scale: 1,
          opacity: 1,
          transition: { duration: 180, ease: 'easeOut' },
        }"
        :src="animImages[0]"
        alt="ROTLM"
        class="w-full object-contain"
      >
      <img
        v-else-if="current === 1 && animImages[1]"
        key="img-1"
        v-motion
        :initial="{ scale: 0.5, opacity: 1 }"
        :enter="{
          scale: 1,
          opacity: 1,
          transition: { duration: 180, ease: 'easeOut' },
        }"
        :src="animImages[1]"
        alt="Cap"
        class="w-full object-contain"
      >
      <img
        v-else-if="current === 2 && animImages[2]"
        key="img-2"
        v-motion
        :initial="{ scale: 0.5, opacity: 1 }"
        :enter="{
          scale: 1,
          opacity: 1,
          transition: { duration: 180, ease: 'easeOut' },
        }"
        :src="animImages[2]"
        alt="T-Shirt"
        class="w-full object-contain"
      >
    </div>
  </section>
</template>

<script setup>
const { merch } = useMerch()

const bgImage = computed(() => merch.value?.image3?.url || null)

const animImages = computed(() => [
  merch.value?.image4?.url || null,
  merch.value?.image5?.url || null,
  merch.value?.image6?.url || null,
])

const current = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    current.value = (current.value + 1) % 3
  }, 900)

  onUnmounted(() => clearInterval(interval))
})
</script>
