<template>
  <UDropdownMenu :items="items" mode="hover">
    <UButton
      label="Open"
      color="neutral"
      variant="ghost"
      size="sm"
      trailing-icon="i-lucide-chevron-down"
      class="data-[state=open]:bg-elevated"
    >
      <UUser
        :name="userName"
        size="sm"
        :avatar="{
          icon: 'heroicons:user-circle',
          // alt: userName,
        }"
      />
    </UButton>

    <!-- <template #content>
      <div v-if="isDev" class="flex flex-col gap-1 text-xs">
        <div v-for="[label, value] in debug" :key="label" class="flex gap-2 justify-between">
          <span>{{ label }}:</span>
          <span class="tabular-nums">{{ value }}</span>
        </div>
      </div>
    </template> -->

    <template #content>
      ({{ user.role || 'guest' }} )
    </template>
    <!-- <template #content>
      <div class="p-2 flex flex-col">
        <UButton
          color="primary"
          variant="ghost"
          icon="heroicons:user-circle"
          :to="localePath('/register')"
        >
          Edit
        </UButton>
        <UButton
          color="error"
          variant="ghost"
          icon="heroicons:arrow-right-end-on-rectangle"
          @click="logout()"
        >
          Logout
        </UButton>
      </div>
    </template> -->
    <!-- </UPopover> -->
  </udropdownmenu>
</template>

<script setup>
const { t } = useI18n()
const authStore = useAuthStore()
const { user, userName, isDev, userRole } = storeToRefs(authStore)
const { logout } = authStore

const localePath = useLocalePath()

const debug = ref([
  ['Companions', user.value?.companion_guests && user.value?.companion_guests.length || 0],
  ['Manages', user.value?.managed_guests && user.value?.managed_guests.length || 0],
  ['Recommended', user.value?.recommended_guests && user.value?.recommended_guests.length || 0],
  ['Reservations', user.value?.reservations && user.value?.reservations.length || 0],
])

const items = [
  [
    {
      label: 'Edit',
      icon: 'i-lucide-pencil',
      to: localePath('/register'),
    },
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      color: 'error',
      onSelect() {
        logout()
      },
    },
  ],
  [
    {
      icon: 'i-lucide-user',
      label: t(`guest_roles.${userRole.value}`),
      type: 'label',
      // slot: 'content',
    },
  ],
  // ...(isDev.value
  //   ? [{
  //       label: 'Content',
  //       type: 'label',
  //       slot: 'content',
  //     }]
  //   : []),
]
</script>
