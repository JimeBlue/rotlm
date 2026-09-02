<template>
  <div>
    <!-- Form -->
    <div v-if="view === 'form'">
      <UForm
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
          <UInput v-model="orderForm.phone" type="tel" :placeholder="t('form.contact.phone_placeholder')" class="w-full" />
        </UFormField>
        <UFormField name="message" :label="t('merch.order.message')" required>
          <UTextarea v-model="orderForm.message" :rows="5" class="w-full" />
        </UFormField>
        <UFormField name="consent">
          <UCheckbox
            v-model="orderForm.consent"
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
    </div>

    <!-- Confirmed -->
    <div v-else class="text-center py-8 space-y-4">
      <h3 class="text-green-neon font-bold text-xl uppercase tracking-wide">
        {{ t('contact.form.confirmed.title') }}
      </h3>
      <p class="text-white">
        {{ t('contact.form.confirmed.text') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup'

const emit = defineEmits(['confirmed'])

const { t } = useI18n()

const view = ref('form')
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

async function onSubmit() {
  submitting.value = true
  submitError.value = false

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...orderForm,
        phone: orderForm.phone || null,
      },
    })
    view.value = 'confirmed'
    emit('confirmed')
  }
  catch {
    submitError.value = true
  }
  finally {
    submitting.value = false
  }
}
</script>
