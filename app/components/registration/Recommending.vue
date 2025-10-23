<template>
  <div v-if="form">
    <div>
      <h2 class="text-2xl font-semibold text-primary tracking-tight">
        {{ t("registration.confirming.title") }}
      </h2>

      <p class="mt-2 text-base leading-relaxed">
        {{ t("registration.confirming.text") }}
      </p>

      <p class="mt-6 text-sm text-gray-500 italic">
        {{ t("form.mandatory") }}
      </p>
    </div>
    <UForm
      ref="formRef"
      :state="form"
      :schema="schema"
      autocomplete="off"
      @submit="onSubmit"
      @error="onError"
    >
      <div class="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UFormField name="contact.company_name" :label="t('form.contact.company_name')" required>
          <UInput v-model="form.contact.company_name" />
        </UFormField>
        <UFormField name="contact.first_name" :label="t('form.contact.first_name')" required>
          <UInput v-model="form.contact.first_name" />
        </UFormField>
        <UFormField name="contact.last_name" :label="t('form.contact.last_name')" required>
          <UInput v-model="form.contact.last_name" />
        </UFormField>
        <UFormField name="contact.sex" :label="t('form.contact.sex')" required>
          <USelect v-model="form.contact.sex" :placeholder="t('form.default_option')" :items="optionsForSex" />
        </UFormField>
        <UFormField name="contact.email" :label="t('form.contact.email')" required>
          <UInput v-model="form.contact.email" />
        </UFormField>
      </div>

      <div class="mt-6">
        <UButton
          type="submit"
          :loading="submitting"
          :label="t('buttons.submit')"
        />
      </div>
    </UForm>
  </div>
</template>

<script setup>
// TODO: FIX this to work the same as the others
import * as yup from 'yup'

const { $api } = useNuxtApp()
const { t } = useI18n()
const { namedAlert } = useAlert()

const { createRecommendationGuest } = useSuite()

const authStore = useAuthStore()
const { setUser } = authStore
const { user } = storeToRefs(authStore)

const eventStore = useEventStore()
const { getEvent } = eventStore

const showErrorModal = ref(false)
const errorModal = useConfirmDialog(showErrorModal)

const formStore = useFormStore()
const { form } = storeToRefs(formStore)
const { setFormData } = formStore

const { optionsForSex } = useForm()

const formRef = ref()
const submitting = ref(false)

form.value = createRecommendationGuest()

const schema = yup.object({
  contact: yup.object({
    company_name: yup.string().required(t('validations.required')),
    first_name: yup.string().required(t('validations.required')),
    last_name: yup.string().required(t('validations.required')),
    email: yup.string().email(t('validations.email_invalid')).required(t('validations.required')),
    sex: yup.string().required(t('validations.required')),
  }),
})

async function onSubmit(FormSubmitEvent) {
  submitting.value = true

  try {
    const response = await $api(`/api/guest/recommend`, {
      method: 'post',
      body: { ...FormSubmitEvent.data, code: user.value.code },
    })

    if (!user.value.recommended_guests) { user.value.recommended_guests = [] }
    user.value.recommended_guests.push(response.guest)
    form.value = createRecommendationGuest()
  }
  catch (error) {
    // namedAlert(error.data.message, 'error')

    await getEvent()

    const serverErrors = []
    for (const [key, value] of Object.entries(error.data.data)) {
      serverErrors.push({
        message: `${error.data.message} ${value}`,
        name: key,
      })
    }

    formRef.value.setErrors(serverErrors)
  }
  submitting.value = false
}

async function onError(event) {
  // namedAlert('incomplete', 'error')
  errorModal.reveal()
  // console.log(formErrors.value)

  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>
