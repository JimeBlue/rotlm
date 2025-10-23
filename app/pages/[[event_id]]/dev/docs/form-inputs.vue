<template>
  <div>
    <BaseHero />
    <section v-if="event">
      <div class="container">
        <UForm
          ref="formRef"
          :state="state"
          :schema="schema"
          class="w-full"
          @submit="onSubmit"
        >
          <div class="grid gap-4">
            <UFormField label="Input" name="input" required>
              <UInput v-model="state.input" placeholder="john@lennon.com" />
            </UFormField>

            <div class="flex flex-col gap-4">
              <UFormField name="switch">
                <USwitch v-model="state.switch" label="Switch me" />
              </UFormField>

              <UFormField name="checkbox">
                <UCheckbox v-model="state.checkbox" label="Check me" />
              </UFormField>
            </div>

            <UFormField name="slider" label="Slider">
              <USlider v-model="state.slider" />
            </UFormField>

            <UFormField name="boolean_example" label="Boolean Example">
              <USelect v-model="state.boolean" :items="boolean_example" />
            </UFormField>

            <UFormField name="select" label="Select">
              <USelect v-model="state.select" :items="items" />
            </UFormField>

            <UFormField name="selectMultiple" label="Select (Multiple)">
              <USelect v-model="state.selectMultiple" multiple :items="items" />
            </UFormField>

            <UFormField name="selectMenu" label="Select Menu">
              <USelectMenu v-model="state.selectMenu" :items="items" />
            </UFormField>

            <UFormField name="selectMenuMultiple" label="Select Menu (Multiple)">
              <USelectMenu v-model="state.selectMenuMultiple" multiple :items="items" />
            </UFormField>

            <UFormField name="inputMenu" label="Input Menu">
              <UInputMenu v-model="state.inputMenu" :items="items" />
            </UFormField>

            <UFormField name="inputMenuMultiple" label="Input Menu (Multiple)">
              <UInputMenu v-model="state.inputMenuMultiple" multiple :items="items" />
            </UFormField>

            <UFormField name="inputNumber" label="Input Number">
              <UInputNumber v-model="state.inputNumber" />
            </UFormField>

            <UFormField label="Textarea" name="textarea">
              <UTextarea v-model="state.textarea" />
            </UFormField>

            <div class="grid grid-cols-3 gap-4">
              <UFormField name="radioGroup">
                <URadioGroup v-model="state.radioGroup" legend="Radio group" :items="items" />
              </UFormField>

              <UFormField name="radioGroup2">
                <URadioGroup
                  v-model="state.radioGroup"
                  variant="table"
                  legend="Radio group"
                  :items="items"
                />
              </UFormField>

              <UFormField name="radioGroup3">
                <URadioGroup
                  v-model="state.radioGroup"
                  variant="card"
                  legend="Radio group"
                  :items="items"
                />
              </UFormField>
            </div>

            <div class="grid lg:grid-cols-3 gap-4">
              <UFormField name="checkboxGroup">
                <UCheckboxGroup v-model="state.checkboxGroup" legend="Checkbox group" :items="items" />
              </UFormField>
              <UFormField name="checkboxGroup">
                <UCheckboxGroup
                  v-model="state.checkboxGroup"
                  variant="table"
                  legend="Checkbox group"
                  :items="items"
                />
              </UFormField>
              <UFormField name="checkboxGroup">
                <UCheckboxGroup
                  v-model="state.checkboxGroup"
                  variant="card"
                  legend="Checkbox group"
                  :items="items"
                  orientation="horizontal"
                  indicator="hidden"
                />
              </UFormField>
            </div>
            <UFormField name="pin" label="Pin Input" :error-pattern="/(pin)\..*/">
              <UPinInput v-model="state.pin" />
            </UFormField>

            <!-- <UFormField name="file" label="File Input">
        <UFileUpload
          v-model="state.file"
          label="Drop your image here"
          description="PNG (max. 1MB)"
          class="w-full min-h-44"
        />
      </UFormField> -->
          </div>

          <div class="flex gap-2 mt-8">
            <UButton type="submit">
              Submit
            </UButton>

            <UButton variant="outline" @click="form?.clear()">
              Clear
            </UButton>
          </div>
        </UForm>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as yup from 'yup'

definePageMeta({
  layout: 'public',
})

const eventStore = useEventStore()
const { getEvent } = eventStore
const { event } = storeToRefs(eventStore)
const { eventPath } = useEventPath()

await getEvent()

const schema = yup.object({
  input:
    yup.string().min(10, 'Must be at least 10 characters').required('required'),
  inputNumber:
    yup.number().min(10, 'Must be at least 10').required(),
  inputMenu: yup.mixed()
    .test('is-option-2', 'Select Option 2', option => option?.value === 'option-2'),
  inputMenuMultiple: yup.mixed()
    .test('includes-option-2', 'Include Option 2', values => Array.isArray(values) ? values.some((opt: any) => opt?.value === 'option-2') : false),
  textarea: yup.string().min(10, 'Must be at least 10 characters').required(),
  select: yup.string()
    .test('is-option-2', 'Select Option 2', val => val === 'option-2'),
  selectMultiple: yup.array().of(yup.string()).test('includes-option-2', 'Include Option 2', vals => Array.isArray(vals) ? vals.includes('option-2') : false),
  selectMenu: yup.mixed()
    .test('is-option-2', 'Select Option 2', option => option?.value === 'option-2'),
  selectMenuMultiple: yup.mixed()
    .test('includes-option-2', 'Include Option 2', values => Array.isArray(values) ? values.some((opt: any) => opt?.value === 'option-2') : false),
  switch: yup.boolean().oneOf([true], 'Toggle me'),
  checkbox: yup.boolean().oneOf([true], 'Check me'),
  radioGroup: yup.string().oneOf(['option-2'], 'Select Option 2'),
  checkboxGroup: yup.array().of(yup.string()).test('includes-option-2', 'Include Option 2', vals => Array.isArray(vals) ? vals.includes('option-2') : false),
  slider: yup.number().max(20, 'Must be less than 20'),
  pin: yup.array().of(yup.string().matches(/^\d$/, 'Must be a digit')).length(5, 'Must be exactly 5 digits'),
  file: yup.mixed()
    .test('file-required', 'File is required', file => !!file)
    .test('file-size', 'File must be <= 1MB', (file: File) => file ? file.size <= 1024 * 1024 : false)
    .test('file-type', 'File must be a PNG', (file: File) => file ? file.type === 'image/png' : false),

})

type Schema = yup.InferType<typeof schema>

const state = reactive<Partial<Schema>>({})

const formRef = useTemplateRef('formRef')

const { makeBoolean } = useForm()

const boolean_example = ref(makeBoolean())

const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>
