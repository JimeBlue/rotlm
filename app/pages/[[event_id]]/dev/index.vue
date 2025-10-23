<template>
  <div>
    <BaseHero />
    <section>
      <div class="container">
        <!-- <div v-for="[label, value] in debug" :key="label" class="flex gap-2 justify-between">
          <span>{{ label }}:</span>
          <span class="tabular-nums">{{ value }}</span>
        </div> -->
        <UPageCard title="Pages">
          <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:max-w-3xl" />
        </UPageCard>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'public',
})

const authStore = useAuthStore()
const { user, userName, isDev } = storeToRefs(authStore)
const { logout } = authStore

const localePath = useLocalePath()

const debug = ref([
  ['Companions', user.value?.companion_guests && user.value?.companion_guests.length || 0],
  ['Recommended', user.value?.recommended_guests && user.value?.recommended_guests.length || 0],
  ['Reservations', user.value?.reservations && user.value?.reservations.length || 0],
])

const items = ref([
  {
    label: 'Default Pages',
    defaultOpen: true,
    icon: 'i-lucide-book',
    children: [{
      label: 'Login',
      to: '/login',
    }, {
      label: 'Home',
      to: '/',
    }, {
      label: 'Register',
      to: '/register',
    }],
  },
  {
    label: 'Available Pages (/dev)',
    badge: '/dev',
    defaultOpen: true,
    icon: 'i-heroicons-code-bracket',
    children: [
      {
        label: 'Contact',
        to: '/contact',
      },
      {
        label: 'Gallery',
        to: '/dev/gallery',
        icon: 'i-lucide-image',
      },
      {
        label: 'Companions Dashboard',
        icon: 'i-heroicons-users-solid',
        to: '/dev/companion-dashboard',
      },
      {
        label: 'All Guests Dashboard',
        icon: 'i-heroicons-user-group-solid',
        to: '/dev/guest-dashboard',
      },
      {
        label: 'Edit Single Guest',
        to: '/dev/guest',
      },
      {
        label: 'Add Recommendation',
        to: '/dev/recommendation',
      },
      {
        label: 'Content',
        to: '/dev/content',
      },
    ],
  },
  {
    label: 'Docs',
    badge: '/dev/docs',
    defaultOpen: true,
    icon: 'i-lucide-book-open',
    children: [
      {
        label: 'Alerts',
        to: '/dev/docs/alerts',
      },
      {
        label: 'Form Inputs',
        to: '/dev/docs/form-inputs',
      },
    ],
  },
  {
    label: 'Archived',
    badge: '/dev/archived',
    defaultOpen: false,
    icon: 'i-heroicons-archive-box',
    children: [
      {
        label: 'Nuxt Ui 2 - Old Import',
        to: '/dev/archived/import',
      },
    ],
  },
])
</script>
