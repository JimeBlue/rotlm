<template>
  <div
    class="relative mx-auto min-h-fit w-full max-w-[500px] transform-gpu cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-200 ease-in-out hover:scale-[103%] dark:bg-transparent dark:backdrop-blur-md"
    style="box-shadow: 0 -20px 80px -20px rgba(255, 255, 255, 0.12) inset; border: 1px solid rgba(255, 255, 255, 0.1);"
  >
    <div class="flex flex-row items-center gap-4">
      <div class="flex size-10 items-center justify-center rounded-2xl bg-primary-500/20">
        <span class="text-lg">🎸</span>
      </div>
      <div class="flex flex-col overflow-hidden">
        <div class="flex flex-row items-center text-lg font-medium whitespace-pre text-white">
          <span class="text-sm sm:text-lg font-headline uppercase">{{ venue }}</span>
          <span class="mx-1 text-gray-400">·</span>
          <span class="text-xs sm:text-sm text-gray-400">{{ city }}</span>
        </div>
        <p class="text-sm font-normal text-white/60">
          {{ displayDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  displayDate: string
  venue: string
  city: string
}

defineProps<Props>()
</script>
