<template>
  <section>
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

    <div class="mt-10">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UFormField
          name="contact.first_name"
          :label="t('form.contact.first_name')"
          required
        >
          <UInput v-model="form.contact.first_name" />
        </UFormField>

        <UFormField
          name="contact.last_name"
          :label="t('form.contact.last_name')"
          required
        >
          <UInput v-model="form.contact.last_name" />
        </UFormField>

        <UFormField
          name="contact.sex"
          :label="t('form.contact.sex')"
          required
        >
          <USelect
            v-model="form.contact.sex"
            :placeholder="t('form.default_option')"
            :items="optionsForSex"
          />
        </UFormField>

        <UFormField
          name="contact.email"
          :label="t('form.contact.email')"
          required
        >
          <UInput v-model="form.contact.email" />
        </UFormField>

        <UFormField
          name="contact.company_name"
          :label="t('form.contact.company_name')"
        >
          <UInput v-model="form.contact.company_name" />
        </UFormField>

        <UFormField
          name="contact.country"
          :label="t('form.contact.country')"
        >
          <USelect
            v-model="form.contact.country"
            :placeholder="t('form.default_option')"
            :items="optionsForCountry"
          />
        </UFormField>

        <UFormField
          name="extended_fields.field_2"
          label="Test"
        >
          <USelect
            v-model="form.extended_fields.field_2"
            placeholder="Select"
            legend="Choose something"
            :items="selectOptions.main"
          />
        </UFormField>

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
    </div>

    <div class="mt-6">
      <UFormField label="Teilnahmebedingungen" />
      <UFormField name="extended_fields.agree_terms_and_conditions">
        <UCheckbox v-model="form.extended_fields.agree_terms_and_conditions">
          <template #label>
            Hiermit bestätige ich die
            <ULink target="_blank" to="#" class="underline">
              Teilnahmebedingungen
            </ULink>.
          </template>
        </UCheckbox>
      </UFormField>
    </div>
  </section>
</template>

<script setup>
import * as yup from 'yup'

defineProps({
  selectOptions: {
    type: Object,
    default: () => ({ main: [] }),
  },
})

const { t } = useI18n()

const { optionsForSex, optionsForCountry } = useForm()
const { isEmail } = useFormValidations()

const form = defineModel('form', { type: Object, required: true })

const schema = yup.object({
  contact: yup.object({
    first_name: yup.string().required(t('validations.required')),
    last_name: yup.string().required(t('validations.required')),
    sex: yup.string().required(t('validations.required')).oneOf(['male', 'female', 'diverse'], 'Invalid'),
    email: isEmail(),
    company_name: yup.string().required(t('validations.required')),
    country: yup.string().required(t('validations.required')),
  }),
  extended_fields: yup.object({
    field_2: yup.string(),
    image_test: yup.string(),
    agree_terms_and_conditions: yup.boolean().oneOf([true], 'Must agree to terms'),
  }),
})

defineExpose({
  schema,
})
</script>
