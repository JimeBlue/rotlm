<template>
  <div>
    <UForm
      v-if="form"
      ref="formRef"
      :state="form"
      :schema="schema"
      :disabled="formSubmitting"
      autocomplete="off"
      @submit="onSubmit"
      @error="onError"
    >
      <!-- Direct guest fields -->

      <UFormField
        name="status"
        label="Status"
        required
      >
        <USelect
          v-model="form.status"
          :placeholder="t('form.default_option')"
          :items="statusOptions"
          :disabled="formSubmitting"
        />
      </UFormField>
      <USeparator class="my-6" />
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UFormField
          name="contact.first_name"
          :label="t('form.contact.first_name')"
          required
        >
          <UInput v-model="form.contact.first_name" :disabled="formSubmitting" />
        </UFormField>

        <UFormField
          name="contact.last_name"
          :label="t('form.contact.last_name')"
          required
        >
          <UInput v-model="form.contact.last_name" :disabled="formSubmitting" />
        </UFormField>

        <UFormField
          name="contact.sex"
          :label="t('form.contact.sex')"
        >
          <USelect
            v-model="form.contact.sex"
            :placeholder="t('form.default_option')"
            :items="optionsForSex"
            :disabled="formSubmitting"
          />
        </UFormField>

        <UFormField
          name="contact.email"
          :label="t('form.contact.email')"
          required
        >
          <UInput v-model="form.contact.email" :disabled="formSubmitting" />
        </UFormField>
        <!--
        <UFormField
          name="contact.company_name"
          :label="t('form.contact.company_name')"
        >
          <UInput v-model="form.contact.company_name" :disabled="formSubmitting" />
        </UFormField>

        <UFormField
          name="contact.country"
          :label="t('form.contact.country')"
        >
          <USelect
            v-model="form.contact.country"
            :placeholder="t('form.default_option')"
            :items="optionsForCountry"
            :disabled="formSubmitting"
          />
        </UFormField> -->
      </div>

      <div class="mt-6 grid gap-4">
        <UFormField
          name="extended_fields.image_test"
          label="Image"
        >
          <FormUpload
            v-model="form.extended_fields.image_test"
            field="image_test"
            field-label="Image"
            :for="form"
            :max-size="50"
            :max-size-resizable="10"
          />
        </UFormField>
      </div>
      <div class="mt-12">
        <UButton type="submit" :loading="formSubmitting">
          Submit
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'

const props = defineProps({
  guest: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const { $api } = useNuxtApp()

const { t } = useI18n()
const { Alert, namedAlert } = useAlert()

const formStore = useFormStore()
const { formSubmitting, formErrors, serverErrors } = storeToRefs(formStore)

const eventStore = useEventStore()
const { getEvent } = eventStore

const { optionsForSex, optionsForCountry } = useForm()

const form = ref({ ...cloneDeep(props.guest) })

const formRef = useTemplateRef('formRef')

const schema = yup.object({
  status: yup.string().required(t('validations.required')),
  contact: yup.object({
    first_name: yup.string().required(t('validations.required')),
    last_name: yup.string().required(t('validations.required')),
    // sex: yup.string().required(t('validations.required')).oneOf(['male', 'female', 'diverse'], 'Invalid'),
    email: yup.string().email('Invalid email').required(t('validations.required')),
    // company_name: yup.string().required(t('validations.required')),
    // country: yup.string().required(t('validations.required')),
  }),
})

async function onSubmit(event: any) {
  formSubmitting.value = true
  const payload = event.data

  Alert({
    title: 'Loading',
    icon: 'loading',
    showConfirmButton: false,
  })

  let route = 'update-single'
  if (!payload.code && payload.role === 'companion') {
    route = 'companion'
  }
  else if (!payload.code && payload.role === 'main') {
    route = 'create'
  }

  try {
    await $api(`/api/guest/${route}`, {
      method: 'post',
      body: payload,
    })

    Alert({
      title: 'Success',
      icon: 'success',
    })

    emit('close')
  }
  catch (e) {
    const error = (e as any).data
    const errors = (e as any).data.data?.errors || []

    if (errors.length) {
      serverErrors.value = errors
      formErrors.value = errors
      formRef.value?.setErrors(errors)

      await Alert({
        title: error.message,
        text: errors.map((err: any) => err.message).join('\n'),
        icon: 'error',
      })
    }
    else {
      await namedAlert('general_error')
    }

    await getEvent()
  }
  finally {
    formSubmitting.value = false
  }
}

async function onError(event: any) {
  console.warn('error', event)
}

const statusOptions = [
  { value: 'listed', label: 'Listed' },
  { value: 'requested', label: 'Requested' },
  { value: 'invited', label: 'Invited' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'cancelled', label: 'Cancelled' },
]
</script>
