<template>
  <section>
    <div>
      <h2 class="text-2xl font-semibold text-primary tracking-tight">
        Companions
      </h2>
      <p class="mt-2 text-base leading-relaxed">
        {{ t("registration.confirming.text") }}
      </p>
      <p class="mt-6 text-sm text-gray-500 italic">
        {{ t("form.mandatory") }}
      </p>
    </div>
    <div id="companion_guests" class="mt-6">
      <div
        v-for="(companion, index) in form.companion_guests"
        :id="`companion_guests.${companion.id}`"
        :key="companion.id"
        class="mb-6 rounded p-4 ring-1 ring-gray-300"
      >
        <div class="flex items-center justify-between gap-2">
          <span class="space-x-2 text-lg font-bold">
            <span>{{ t("registration.guest") }} {{ index + 1 }}</span>
            <UBadge
              v-if="companion.status === 'cancelled'"
              color="error"
              variant="solid"
            >{{ t('status.cancelled') }}</UBadge>
          </span>
          <UButton
            v-if="companion.status !== 'cancelled'"
            size="sm"
            color="error"
            @click="$emit('removeCompanionGuest', companion.id, index)"
          >
            {{ /^local-/.test(companion.id) ? t('buttons.remove_guest') : t('buttons.cancel_guest') }}
          </UButton>
        </div>
        <div class="mt-4">
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <UFormField
              :name="`companion_guests.${index}.contact.first_name`"
              :label="t('form.contact.first_name')"
              required
            >
              <UInput
                v-model="companion.contact.first_name"
                :disabled="companion.status === 'cancelled'"
              />
            </UFormField>

            <UFormField
              :name="`companion_guests.${index}.contact.last_name`"
              :label="t('form.contact.last_name')"
              required
            >
              <UInput
                v-model="companion.contact.last_name"
                :disabled="companion.status === 'cancelled'"
              />
            </UFormField>

            <UFormField
              :name="`companion_guests.${index}.contact.sex`"
              :label="t('form.contact.sex')"
              required
            >
              <USelect
                v-model="companion.contact.sex"
                :placeholder="t('form.default_option')"
                :items="optionsForSex"
                :disabled="companion.status === 'cancelled'"
              />
            </UFormField>

            <UFormField
              :name="`companion_guests.${index}.contact.email`"
              :label="t('form.contact.email')"
              required
            >
              <UInput
                v-model="companion.contact.email"
                :disabled="companion.status === 'cancelled'"
              />
            </UFormField>

            <UFormField
              :name="`companion_guests.${index}.contact.company_name`"
              :label="t('form.contact.company_name')"
            >
              <UInput
                v-model="companion.contact.company_name"
                :disabled="companion.status === 'cancelled'"
              />
            </UFormField>

            <UFormField
              :name="`companion_guests.${index}.contact.country`"
              :label="t('form.contact.country')"
            >
              <USelect
                v-model="companion.contact.country"
                :placeholder="t('form.default_option')"
                :items="optionsForCountry"
                :disabled="companion.status === 'cancelled'"
              />
            </UFormField>

            <UFormField
              :name="`companion_guests.${index}.extended_fields.field_2`"
              label="Test"
            >
              <USelect
                v-model="companion.extended_fields.field_2"
                placeholder="Select"
                legend="Choose something"
                :items="selectOptions.companions?.[index] || []"
                :disabled="companion.status === 'cancelled'"
              />
            </UFormField>

            <UFormField
              :name="`companion_guests.${index}.extended_fields.image_test`"
              label="Image"
            >
              <FormUpload
                v-model="companion.extended_fields.image_test"
                field="image_test"
                field-label="Image"
                :for="companion"
                :max-size="50"
                :max-size-resizable="10"
                :disabled="companion.status === 'cancelled'"
              />
            </UFormField>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-6 flex justify-start pb-6 ">
      <UButton
        :block="form.companion_guests.length === 0"
        :class="form.companion_guests.length > 0 ? 'py-4' : 'py-8'"
        color="neutral"
        icon="lucide:user-round-plus"
        :variant="form.companion_guests.length > 0 ? 'soft' : 'outline'"
        size="xl"
        @click="$emit('addCompanionGuest')"
      >
        {{ t('buttons.add_guest') }}
      </UButton>
    </div>
  </section>
</template>

<script setup>
import * as yup from 'yup'

defineProps({
  selectOptions: {
    type: Object,
    default: () => ({ companions: [] }),
  },
})

defineEmits(['addCompanionGuest', 'removeCompanionGuest'])

const { t } = useI18n()
const { optionsForSex, optionsForCountry } = useForm()
const { isEmail } = useFormValidations()

const form = defineModel('form', { type: Object, required: true })

const schema = yup.object({
  companion_guests: yup
    .array()
    .of(
      yup.object({
        contact: yup.object({
          first_name: yup.string().required(t('validations.required')),
          last_name: yup.string().required(t('validations.required')),
          email: isEmail(),
          sex: yup.string().required(t('validations.required')).oneOf(['male', 'female', 'diverse'], 'Invalid'),
          company_name: yup.string().required(t('validations.required')),
          country: yup.string().required(t('validations.required')),
        }),
        extended_fields: yup.object({
          field_2: yup.string(),
          image_test: yup.string(),
        }),
      }),
    )
    // .min(1, 'At least one companion guest is required')
    .max(7, 'No more than 7 companion guests allowed'),
})

defineExpose({
  schema,
})
</script>
