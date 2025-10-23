<template>
  <div id="register">
    <BaseViews :views="views">
      <template #closed>
        <RegistrationClosed />
      </template>
      <template #savethedate>
        <RegistrationSaveTheDate />
      </template>
      <template #start>
        <RegistrationStart />
      </template>
      <template #confirming>
        <RegistrationConfirming />
      </template>
      <template #confirmed>
        <RegistrationConfirmed />
      </template>
      <template #cancelling>
        <RegistrationCancelling />
      </template>
      <template #cancelled>
        <RegistrationCancelled />
      </template>
    </BaseViews>
  </div>
</template>

<script setup>
const views = ref([
  'closed',
  'start',
  'confirming',
  'confirmed',
  'cancelling',
  'cancelled',
])

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const eventStore = useEventStore()
const { event } = storeToRefs(eventStore)
const { getEvent } = eventStore

const formStore = useFormStore()
const { setFormData } = formStore

const stepStore = useStepStore()
const { view } = storeToRefs(stepStore)

await useAsyncData('event', () => getEvent())
setFormData()

const registrationStatusView = {
  listed: 'start',
  invited: 'start',
  confirmed: 'confirmed',
  cancelled: 'cancelled',
}

if (event.value?.registration_closed) {
  view.value = 'closed'
}
else {
  view.value = registrationStatusView[user.value?.status] || 'start'
}
</script>
