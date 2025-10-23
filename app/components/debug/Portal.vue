<template>
  <ClientOnly>
    <Teleport v-if="isDev" to="#dev">
      <div class="flex flex-col items-center gap-1">
        <span class="text-xxs font-bold uppercase leading-tight tracking-wide">{{ title }}</span>
        <slot />
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
defineProps({
  title: String,
})
const authStore = useAuthStore()
const { isDev } = storeToRefs(authStore)
</script>
