<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
    <UCard
      v-for="guest in summary"
      :key="guest.id"
      class="grid grid-cols-1 items-start gap-y-1 rounded"
      :class="[guest.classes]"
      :ui="{ body: 'p-0 sm:p-0' }"
    >
      <template #header>
        <div class="flex items-start justify-between">
          <h3 v-if="guest.title" class="font-headline text-lg font-bold">
            {{ guest.title }}
          </h3>

          <UUser
            v-else-if="guest.user"
            :name="guest.user.name"
            :description="guest.user.description"
            :avatar="{
              src: guest.user.avatar,
              alt: guest.user.name,
            }"
            size="xl"
          />

          <UBadge
            v-if="guest.fields.role"
            :label="guest.fields.role"
            size="md"
            variant="outline"
            :color="guest.fields.role === 'Primary' ? 'primary' : 'neutral'"
          />
        </div>
      </template>

      <div class="grid grid-cols-1 items-start gap-4 p-5">
        <UCard v-for="section in guest.sections" :key="section" :ui="{ body: 'p-0 sm:p-0' }">
          <template #header>
            <h4 class="uppercase text-sm font-medium text-gray-950">
              {{ section.title }}
            </h4>
          </template>

          <!-- Main guest only content -->
          <div v-if="guest.fields.role === 'main' && section.title === 'Personal Info'" class="px-4 py-3 bg-primary-50">
            <p class="text-sm text-primary-700">
              This is only shown for the main guest in personal info
            </p>
          </div>

          <ul v-if="section.fields" class="divide-y divide-gray-100">
            <template v-for="(fieldData, key) in section.fields" :key="key">
              <li class="px-4 py-2 sm:px-6 sm:py-3 relative grid grid-cols-1 items-center odd:bg-gray-50 sm:grid-cols-[1fr_2fr] lg:gap-x-10 text-gray-700">
                <span class="text-sm sm:text-base text-gray-900 font-medium">{{ key }}</span>

                <div class="flex flex-col gap-1">
                  <span
                    v-if="fieldData.fieldDefinition?.type === 'multiselect_enum'"
                    v-html="Array.isArray(fieldData.value) ? fieldData.value.map(val => fieldData.fieldDefinition?.options?.find(opt => opt.key === val)?.label?.[localeAlias] || val).join(', ') : (fieldData.fieldDefinition?.options?.find(opt => opt.key === fieldData.value)?.label?.[localeAlias] || fieldData.value)"
                  />
                  <span
                    v-else-if="fieldData.fieldDefinition?.type === 'enum'"
                    v-html="fieldData.fieldDefinition?.options?.find(opt => opt.key === fieldData.value)?.label?.[localeAlias] || fieldData.value"
                  />
                  <span v-else-if="fieldData.fieldDefinition?.type === 'boolean'">
                    <UIcon v-if="fieldData.value" class="size-6 text-success" name="heroicons:check-circle-16-solid" />
                    <UIcon v-else class="size-6 text-error" name="heroicons:x-circle-16-solid" />
                  </span>
                  <span v-else-if="fieldData.fieldDefinition?.type === 'file'">File Lookup Todo</span>
                  <span v-else v-html="fieldData.value" />

                  <!-- Show field type if available -->
                  <span v-if="fieldData.fieldDefinition?.type" class="text-xs text-gray-500">
                    <pre>{{ fieldData.fieldDefinition.type }}</pre>
                  </span>
                </div>
              </li>
            </template>
          </ul>
        </UCard>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const formStore = useFormStore()
const { form } = storeToRefs(formStore)
const { t } = useI18n()
const { localeAlias } = useLocales()
const eventStore = useEventStore()
const { event } = storeToRefs(eventStore)

// Field definitions - customize for main vs companion guests
// Labels auto-generated from event store field definitions unless manually specified

const sharedFields = {
  'Personal Info': [
    { key: 'contact.first_name', label: () => t('form.contact.first_name') },
    { key: 'contact.last_name', label: () => t('form.contact.last_name') },
    { key: 'contact.email', label: () => t('form.contact.email') },
  ],
  'Extended Info': [
    { key: 'extended_fields.boolean' },
    { key: 'extended_fields.field_1' },
    { key: 'extended_fields.select' },
    { key: 'extended_fields.test_field_20250116' },
    { key: 'extended_fields.test_multiselect' },
    { key: 'extended_fields.select_option' },
    { key: 'extended_fields.date' },
    { key: 'extended_fields.file_test' },
    { key: 'extended_fields.image_test' },
    { key: 'extended_fields.test_stars' },
    { key: 'extended_fields.field_2' },
    { key: 'extended_fields.how_would_you_rate_the_test_event' },
  ],
}

const guestFields = {
  main: {
    'Personal Info': [
      ...sharedFields['Personal Info'],
      { key: 'contact.company_name', label: () => t('form.contact.company_name') },
    ],
    'Booking': [
      { key: 'booking.extended_fields.cat' },
    ],
    'Extended Info': [
      ...sharedFields['Extended Info'],
    ],
  },
  companion: {
    'Personal Info': [
      ...sharedFields['Personal Info'],
    ],
    'Extended Info': [
      ...sharedFields['Extended Info'],
    ],
  },
}

function makeGuestSummary(g, index, config = { classes: '', type: 'companion' }) {
  const name = g.contact.full_name ?? `${g.contact.first_name} ${g.contact.last_name}`
  const fieldsBySection = guestFields[config.type] || guestFields.companion

  // Process each section
  const sections = []
  Object.entries(fieldsBySection).forEach(([sectionName, fields]) => {
    const sectionFields = {}

    fields.forEach((field) => {
      const value = field.key.split('.').reduce((obj, key) => obj?.[key], g)
      // if (value !== null && value !== undefined && (Array.isArray(value) || (value && value.length > 0))) {
      if (true) {
        // Get field definition from event store
        const keyParts = field.key.split('.')
        let fieldDefinition = null
        if (keyParts[0] === 'extended_fields' && keyParts[1]) {
          fieldDefinition = event.value?.field_definitions?.guest?.[keyParts[1]]
        }
        else if (keyParts[0] === 'booking' && keyParts[2]) {
          fieldDefinition = event.value?.field_definitions?.booking?.[keyParts[2]]
        }

        // Get label - priority: manual label > event store definition > field key
        let label
        if (field.label) {
          // Manual label provided
          label = typeof field.label === 'function' ? field.label() : field.label
        }
        else {
          // Auto-generate from event store field definitions
          if (fieldDefinition?.label?.[localeAlias.value]) {
            label = fieldDefinition.label[localeAlias.value]
          }
          else {
            label = keyParts[keyParts.length - 1] // fallback to last part of key
          }
        }

        sectionFields[label] = {
          value,
          fieldDefinition,
          originalKey: field.key,
        }
      }
    })

    if (Object.keys(sectionFields).length > 0) {
      sections.push({ title: sectionName, fields: sectionFields })
    }
  })

  return {
    id: `guest-${index + 1}`,
    title: false,
    classes: config.classes,
    fields: g,
    sections,
    user: {
      name,
      description: `${g.contact.email}`,
      avatar: g.files?.length && g.files[0]?.original_url || null,
    },
  }
}

const summary = computed(() => {
  if (!form.value) { return [] }

  let guestSections = []
  if (form.value.companion_guests && form.value.companion_guests.length) {
    guestSections = form.value.companion_guests.map((g, index) => {
      return makeGuestSummary(g, index)
    })
  }

  return [
    makeGuestSummary(form.value, false, { classes: 'lg:col-span-2', type: 'main' }),
    ...guestSections,
  ]
})
</script>
