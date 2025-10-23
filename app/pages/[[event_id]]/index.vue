<template>
  <div>
    <BaseHero />
    <section>
      <div class="container">
        <!-- <Registration /> -->
        Hello
      </div>
    </section>
  </div>
</template>

<script setup>
const eventStore = useEventStore()
const { getEvent } = eventStore

await useAsyncData('event', () => getEvent())
</script>
