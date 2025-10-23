<template>
  <div>
    <BaseHero />
    <section>
      <div class="container">
        <UForm
          v-if="formState === 'edit'"
          ref="formRef"
          :state="form"
          :schema="schema"
          autocomplete="off"
          @submit="onSubmit"
          @error="onError"
        >
          <div class="space-y-6">
            <h3 class="text-primary pt-2 text-2xl font-bold">
              Persönliche Daten
            </h3>
            <UFormField
              required
              name="contact.sex"
              :label="t('form.contact.sex')"
            >
              <USelect
                v-model="form.contact.sex"
                :placeholder="t('form.default_option')"
                :items="optionsForSex"
              />
            </UFormField>

            <UFormField
              required
              name="contact.first_name"
              :label="t('form.contact.first_name')"
            >
              <UInput v-model="form.contact.first_name" />
            </UFormField>

            <UFormField
              required
              name="contact.last_name"
              :label="t('form.contact.last_name')"
            >
              <UInput v-model="form.contact.last_name" />
            </UFormField>

            <UFormField
              required
              name="contact.company_name"
              :label="t('form.contact.company_name')"
            >
              <UInput v-model="form.contact.company_name" />
            </UFormField>

            <UFormField
              required
              name="contact.email"
              :label="t('form.contact.email')"
            >
              <UInput v-model="form.contact.email" />
            </UFormField>

            <UFormField
              required
              name="message"
              label="Message"
            >
              <UTextarea v-model="form.message" />
            </UFormField>

            <UFormField
              name="extended_fields.datenschutzbestimmungen"
              label="Datenschutzbestimmungen"
              required
            >
              <UCheckbox v-model="form.extended_fields.datenschutzbestimmungen">
                <template #label>
                  Ja, die
                  <ULink target="_blank" class="underline" to="https://bauenundleben.de/datenschutz">
                    Datenschutzbestimmungen
                  </ULink>
                  habe ich zur Kenntnis genommen.
                </template>
              </UCheckbox>
            </UFormField>

            <UButton
              :loading="submitting"
              type="submit"
            >
              Absenden
            </UButton>
          </div>
        </UForm>

        <div v-if="formState === 'complete'">
          <h2 class="text-primary text-2xl font-bold">
            Thank you for your submission.
          </h2>

          <p class="mt-2">
            You sent:
          </p>
          <div class="mt-4 rounded bg-gray-50 p-4">
            <p>{{ form.message }}</p>
          </div>

          <div class="mt-6">
            <UButton @click="resetForm">
              Contact us again
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import * as yup from 'yup'

const { t } = useI18n()
const { Alert } = useAlert()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const submitting = ref(false)
const formState = ref('edit')
const formRef = ref()

const form = ref({
  contact: {
    sex: user.value?.contact?.sex || '',
    first_name: user.value?.contact?.first_name || '',
    last_name: user.value?.contact?.last_name || '',
    company_name: user.value?.contact?.company_name || '',
    email: user.value?.contact?.email || '',
  },
  message: '',
  extended_fields: {
    datenschutzbestimmungen: false,
  },
})

const { optionsForSex } = useForm()

const required = (minLength = 1, message = 'Required') => yup.string().min(minLength, message).required(message)

const checked = (message = 'Please Confirm') => yup.boolean().oneOf([true], message).required(message)

const schema = yup.object({
  code: yup.string().optional(),
  contact: yup.object({
    sex: yup.string().oneOf(['male', 'female', 'diverse'], 'Invalid').required('Required'),
    first_name: required(),
    last_name: required(),
    company_name: required(),
    email: required().email('Invalid email'),
  }),
  message: required(10, 'Must be at least 10 characters'),
  extended_fields: yup.object({
    datenschutzbestimmungen: checked('Check this box please'),
  }),
})

async function onSubmit(FormSubmitEvent) {
  submitting.value = true
  const preparedData = FormSubmitEvent.data

  try {
    await $fetch('/api/email/send', {
      method: 'post',
      body: preparedData,
    })
    formState.value = 'complete'
  }
  catch (error) {
    Alert({
      title: error.code,
      text: error.message,
      icon: 'error',
    })
  }
  submitting.value = false
}

function onError(event) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function resetForm() {
  form.value = {
    contact: {
      sex: user.value?.sex || '',
      first_name: user.value?.first_name || '',
      last_name: user.value?.last_name || '',
      company_name: user.value?.company_name || '',
      email: user.value?.email || '',
    },
    message: '',
    extended_fields: {
      datenschutzbestimmungen: false,
    },
  }
  formState.value = 'edit'
}
</script>
