<template>
  <UForm
    ref="formRef"
    :state="orderForm"
    :schema="orderSchema"
    class="space-y-6"
    @submit="onSubmit"
  >
    <UFormField name="first_name" :label="t('form.contact.first_name')" required>
      <UInput v-model="orderForm.first_name" class="w-full" />
    </UFormField>
    <UFormField name="last_name" :label="t('form.contact.last_name')" required>
      <UInput v-model="orderForm.last_name" class="w-full" />
    </UFormField>
    <UFormField name="email" :label="t('form.contact.email')" required>
      <UInput v-model="orderForm.email" type="email" class="w-full" />
    </UFormField>
    <UFormField name="phone" :label="t('form.contact.phone')">
      <UInput
        v-model="orderForm.phone"
        type="tel"
        :placeholder="t('form.contact.phone_placeholder')"
        class="w-full"
      />
    </UFormField>
    <UFormField name="message" :label="t('merch.order.message')" required>
      <UTextarea v-model="orderForm.message" :rows="5" class="w-full" />
    </UFormField>
    <UFormField name="consent">
      <!-- Empty name: the form is submitted via $fetch, so skip the unlabelled hidden
           native input Reka UI would otherwise render for native form submission -->
      <UCheckbox
        v-model="orderForm.consent"
        name=""
        :ui="{ label: 'after:content-[\'*\'] after:ms-0.5 after:text-error' }"
      >
        <template #label>
          <span>{{ t('merch.order.gdpr_consent') }}</span>
        </template>
      </UCheckbox>
    </UFormField>

    <p v-if="submitError" class="text-red-400 text-sm text-center">
      {{ t('merch.order.error') }}
    </p>

    <div class="flex justify-center">
      <UButton
        type="submit"
        :loading="submitting"
        class="w-fit uppercase tracking-widest font-bold"
      >
        {{ t('merch.order.submit') }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup>
import * as yup from 'yup'

const emit = defineEmits(['confirmed'])

const { t } = useI18n()
const { Alert } = useAlert()

const formRef = ref()
const submitting = ref(false)
const submitError = ref(false)

const orderForm = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
})

const orderSchema = yup.object({
  first_name: yup.string().required(t('validations.required')),
  last_name: yup.string().required(t('validations.required')),
  email: yup.string().email(t('validations.email_invalid')).required(t('validations.email_required')),
  message: yup.string().required(t('validations.required')),
  consent: yup.boolean().oneOf([true], t('validations.required')),
})

function resetForm() {
  orderForm.first_name = ''
  orderForm.last_name = ''
  orderForm.email = ''
  orderForm.phone = ''
  orderForm.message = ''
  orderForm.consent = false
  formRef.value?.clear()
}

async function onSubmit() {
  submitting.value = true
  submitError.value = false

  let sent = false

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...orderForm,
        phone: orderForm.phone || null,
      },
    })
    sent = true
  }
  catch {
    submitError.value = true
  }
  finally {
    submitting.value = false
  }

  if (!sent) {
    return
  }

  // Clear the form first so it is empty behind the confirmation modal
  resetForm()
  emit('confirmed')
  await Alert({
    icon: 'success',
    title: t('contact.form.confirmed.title'),
    text: t('contact.form.confirmed.text'),
    confirmButtonText: t('buttons.close'),
  })
}
</script>
