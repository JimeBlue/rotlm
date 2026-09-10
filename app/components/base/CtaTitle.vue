<template>
  <!-- Sticker-style call to action: white slanted label with bold black condensed text -->
  <div class="flex justify-center mb-6 lg:mb-24">
    <h2
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
      class="inline-block -rotate-2 bg-white px-5 py-2 lg:px-8 lg:py-3 font-logo font-bold text-black uppercase tracking-wide text-3xl lg:text-5xl leading-none origin-center shadow-[0_6px_24px_rgba(0,0,0,0.5)]"
    >
      <slot />
    </h2>
  </div>
</template>
