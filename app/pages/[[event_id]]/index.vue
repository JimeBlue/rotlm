<template>
  <div>
    <BaseHero />
    <section>
      <div class="container">
        This is the band section
      </div>
    </section>
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
