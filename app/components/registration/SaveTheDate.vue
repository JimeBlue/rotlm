<template>
  <div>
    <h2 class="text-primary text-2xl font-bold">
      {{ t('registration.savethedate.title') }}
    </h2>
    <p>
      {{ t('registration.savethedate.text') }}
    </p>
    <div class="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
      <div class="flex flex-col items-start justify-end gap-1">
        <h2 class="text-xl font-bold">
          {{ t('registration.savethedate.confirming.title') }}
        </h2>
        <p>
          {{ t('registration.savethedate.confirming.text') }}
        </p>
        <UButton
          class="mt-3"
          :loading="submitting"
          type="submit"
          @click.prevent="oneClickSubmit('confirmed')"
        >
          {{ t('registration.savethedate.confirming.button') }}
        </UButton>
      </div>
      <div class="flex flex-col items-start justify-end gap-1">
        <h2 class="text-xl font-bold">
          {{ t('registration.savethedate.cancelling.title') }}
        </h2>
        <p>
          {{ t('registration.savethedate.cancelling.text') }}
        </p>
        <UButton
          class="mt-3"
          :loading="submitting"
          type="submit"
          color="gray"
          @click.prevent="oneClickSubmit('cancelled')"
        >
          {{ t('registration.savethedate.cancelling.button') }}
        </UButton>
      </div>
    </div>

    <UModal v-model="showErrorModal" @close="errorModal.cancel">
      <div class="flex flex-col p-4 py-8 text-center">
        <UIcon
          name="heroicons:exclamation-circle"
          class="mx-auto size-24 text-red-400"
        />
        <h3 class="mt-4 text-xl font-bold uppercase">
          Error
        </h3>

        <ul class="mt-3">
          <li
            v-for="({ message }, index) in formErrors"
            :key="index"
            v-text="message"
          />
        </ul>

        <UButton
          class="mx-auto mt-8 text-center"
          color="gray"
          variant="soft"
          :ui="{ inline: 'w-24 justify-center' }"
          label="OK"
          @click="errorModal.cancel"
        />
      </div>
    </UModal>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()
const { t } = useI18n()
const { namedAlert } = useAlert()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { setUser } = authStore

const eventStore = useEventStore()
const { getEvent } = eventStore

const showErrorModal = ref(false)
const errorModal = useConfirmDialog(showErrorModal)

const formStore = useFormStore()
const { formErrors, serverErrors } = storeToRefs(formStore)

const stepStore = useStepStore()
const { view } = storeToRefs(stepStore)

const submitting = ref(false)

async function oneClickSubmit(status = 'confirmed') {
  submitting.value = true
  const preparedData = user.value

  if (preparedData.status === 'confirmed') {
    preparedData.send_automated_email = false
  }

  preparedData.status = status

  if (preparedData?.companion_guests) {
    for (const guest of preparedData.companion_guests) {
      guest.status = status
    }
  }

  try {
    const response = await $api(`/api/guest/update`, {
      method: 'post',
      body: preparedData,
    })

    let hasErrors = []
    if (Array.isArray(response)) {
      hasErrors = response.filter(r => r.status === 'error')

      if (hasErrors.length) {
        await getEvent()
        // handle errors here will change in the future
      }
      else {
        setUser(response[0].guest, response[0].guest.code)
        return view.value = status
      }
    }
  }
  catch (e) {
    const error = e.data
    const errors = e.data?.data.errors

    namedAlert(error?.message, 'error')

    await getEvent()

    serverErrors.value = errors
    formErrors.value = errors
  }
  submitting.value = false
}
</script>
