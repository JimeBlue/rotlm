<template>
  <div>
    <BaseHero />
    <section v-if="event">
      <div class="container">
        <h2 class="font-bold lg:text-2xl">
          {{ event.name || '' }}
        </h2>

        <div class="mt-6 space-y-8">
          <UButton v-if="event.id" :to="eventPath('register')">
            Register
          </UButton>

          <UAccordion :ui="{ trailingIcon: ' group-data-[state=open]:rotate-45' }" :items="items" trailing-icon="i-lucide-plus" />

          <pre class="text-xs">{{ event }}</pre>
        </div>
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
const { event } = storeToRefs(eventStore)
const { eventPath } = useEventPath()

// await useAsyncData(('') => getEvent())
await getEvent()

const items = ref([
  {
    label: 'Is Nuxt UI free to use?',
    content: 'Yes! Nuxt UI is completely free and open source under the MIT license. All 100+ components are available to everyone.',
  },
  {
    label: 'Can I use Nuxt UI with Vue without Nuxt?',
    content: 'Yes! While optimized for Nuxt, Nuxt UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue) to get started.',
  },
  {
    label: 'Is Nuxt UI production-ready?',
    content: 'Yes! Nuxt UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.',
  },
])
</script>
