<template>
  <div
    v-if="isDev"
    class="fixed bottom-4 left-2 z-10 w-auto max-w-xs rounded-md bg-gray-100 p-1 px-2 text-sm ring-1 ring-gray-300 transition-all empty:hidden lg:bottom-4 lg:left-4"
  >
    <div id="dev" class="space-y-2">
      <UButton
        size="sm"
        to="/dev/"
        block
        label="Dev"
      />
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const { isDev } = storeToRefs(authStore)
</script>
