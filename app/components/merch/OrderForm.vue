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
        {{ t('merch.order.confirmed.title') }}
      </h3>
      <p class="text-white">
        {{ t('merch.order.confirmed.text') }}
      </p>
      <NuxtLink
        :to="backLink"
        class="inline-block mt-6 text-green-neon hover:text-white text-sm uppercase tracking-wide"
      >
        {{ t('merch.backToShop') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup'

const props = defineProps({
  backLink: {
    type: String,
    required: true,
  },
  product: {
    type: Object,
    default: null,
  },
})

const { t } = useI18n()

const view = ref('form')
const submitting = ref(false)
const submitError = ref(false)

const orderForm = reactive({
  first_name: '',
  last_name: '',
  email: '',
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
    await $fetch('/api/merch/order', {
      method: 'POST',
      body: {
        ...orderForm,
        product_id: props.product?.productId ?? null,
        product_name: props.product?.name ?? null,
      },
    })
    view.value = 'confirmed'
  }
  catch {
    submitError.value = true
  }
  finally {
    submitting.value = false
  }
}
</script>
