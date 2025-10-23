<template>
  <div v-if="form">
    <UForm
      ref="formRef"
      :state="form"
      :schema="schema[formSteps.step]"
      autocomplete="off"
      @submit="onSubmit"
      @error="onError"
    >
      <FormSteps
        :steps="steps"
        show-progress
        :submitting="formSubmitting"
        :labels="{ next: '', submit: t('buttons.to_cancelled'), previous: '' }"
      >
        <template #1>
          <div>
            <h2 class="text-primary text-2xl font-bold">
              {{ t('registration.cancelling.title') }}
            </h2>
            <p>{{ t('registration.cancelling.text') }}</p>
          </div>
          <div class="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <UFormField
              name="contact.first_name"
              :label="t('form.contact.first_name')"
            >
              <UInput v-model="form.contact.first_name" />
            </UFormField>

            <UFormField
              name="contact.last_name"
              :label="t('form.contact.last_name')"
            >
              <UInput v-model="form.contact.last_name" />
            </UFormField>
            <UFormField name="contact.email" :label="t('form.contact.email')">
              <UInput v-model="form.contact.email" />
            </UFormField>
          </div>
        </template>

        <template #2>
          <FormSummary />
        </template>

        <template #actions-leading>
          <UButton v-if="formSteps.step === '1'" @click="view = 'start'">
            Back
          </UButton>
        </template>
      </FormSteps>
    </UForm>
  </div>
</template>

<script setup>
import * as yup from 'yup'

const { $api } = useNuxtApp()
const { t } = useI18n()
const { namedAlert } = useAlert()

const authStore = useAuthStore()
const { setUser } = authStore

const eventStore = useEventStore()
const { getEvent } = eventStore

const formStore = useFormStore()
const { form, formSubmitting, formErrors, serverErrors } = storeToRefs(formStore)
const { setFormData } = formStore

const stepStore = useStepStore()
const { view, formSteps } = storeToRefs(stepStore)

setFormData()

const steps = ref([
  { id: '1', title: t('form.steps.1') },
])

const formRef = ref()

const schema = computed(() => {
  return {
    1: yup.object({
      contact: yup.object({
        first_name: yup.string().required(t('validations.required')),
        last_name: yup.string().required(t('validations.required')),
      }),
    }),
  }
})

async function onSubmit(FormSubmitEvent) {
  if (formSteps.value.next) { return formSteps.value.step = formSteps.value.next }

  formSubmitting.value = true
  let action = 'update'

  // use form data or use FormSubmitEvent data direct from the form submit event
  // const preparedData = cloneDeep(form.value)
  const preparedData = FormSubmitEvent.data

  preparedData.status = 'cancelled'

  if (preparedData.code) {
    if (preparedData.companion_guests.length) {
      for (const guest of preparedData.companion_guests) {
        guest.status = 'cancelled'
      }
    }
  }

  else { action = 'create' }

  try {
    const response = await $api(`/api/guest/${action}`, {
      method: 'post',
      body: preparedData,
    })
    if (action === 'create') {
      setUser(response.guest, response.guest.code)
      view.value = 'cancelled'
    }

    let hasErrors = []
    if (Array.isArray(response)) {
      hasErrors = response.filter(r => r.status === 'error')

      if (hasErrors.length) { await getEvent() }

      // const serverErrors = []
      hasErrors.forEach((r) => {
        const error = r.error

        const { id, role } = r.payload
        let name = ''
        if (role === 'companion') {
          const index = form.value.companion_guests.findIndex(i => i.id === id)
          name = `companion_guests.${index}.`
        }

        for (const [key, value] of Object.entries(error.errors)) {
          serverErrors.value.push({
            message: value[0].message,
            name: `${name}${key}`,
          })
        }
      })
      if (hasErrors.length) {
        formRef.value.setErrors(serverErrors.value)
        namedAlert(hasErrors[0].error.message, 'error')
      }
      else {
        const guestWithCompanions = {}
        const preparedCompanions = []
        response.forEach((g, i) => {
          if (i !== 0) {
            preparedCompanions.push(g.guest)
          }
        })
        guestWithCompanions.value = { ...response[0].guest, companion_guests: preparedCompanions }

        setUser(guestWithCompanions.value, response[0].guest.code)
        return view.value = 'cancelled'
      }
    }
  }
  catch (e) {
    const error = e.data
    const errors = e.data.data.errors

    namedAlert(error.message, 'error')

    await getEvent()

    serverErrors.value = errors
    formErrors.value = errors
    formRef.value.setErrors(errors)
  }
  formSubmitting.value = false
}

async function onError(event) {
  namedAlert('incomplete', 'error')
  console.log(formErrors.value)
  //  errorModal.reveal()

  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>
