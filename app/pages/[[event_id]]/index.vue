<template>
  <div>
    <BaseHero />
    <BaseBand />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'public',
})

const eventStore = useEventStore()
const { getEvent } = eventStore

await useAsyncData('event', () => getEvent())
</script>
