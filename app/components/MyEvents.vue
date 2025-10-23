<template>
  <div v-if="myEvents">
    <ul class="grid gap-3">
      <li v-for="event in myEvents" :key="event.uuid">
        <UCard>
          <template #header>
            {{ event.name }}
          </template>
          ({{ event.id }})

          <UButton v-if="event.id" :to="eventPath('register', event.id)">
            Register
          </UButton>

          <div v-for="guest in event.guests" :key="guest.uuid">
            {{ guest.code }}
          </div>
        </UCard>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const eventStore = useEventStore()
const { getMyEvents } = eventStore
const { myEvents } = storeToRefs(eventStore)
const { eventPath } = useEventPath()

// const test = await useAsyncData(('ttt') => getMyEvents())
await getMyEvents()
</script>

<style>

</style>
