<template>
  <div>
    <BaseHero />
    <section>
      <div class="container">
        <div>
          <div class="my-6">
            <UButton
              variant="soft"
              color="gray"
              size="md"
              label="All Guests"
              icon="heroicons:chevron-left"
              to="/dashboard/"
            />
          </div>
          <h2 class="text-2xl font-bold text-brand-500">
            Guest Importer
          </h2>
        </div>
        <div class="mt-8">
          <!-- <DashboardImport /> -->
          <div>
            <div class="flex gap-4">
              <UInput
                v-if="!guests.length"
                placeholder="Upload"
                type="file"
                @change="(FileList) => upload(FileList)"
              />

              <UButton
                v-if="guests.length && !fileErrors.length && !importState"
                :loading="importLoading"
                icon="fa-solid:paper-plane"
                @click="importGuests"
              >
                {{ t('dashboard.buttons.upload') }}
              </UButton>

              <UButton
                v-if="guests.length && !fileErrors.length"
                icon="fa-solid:trash-alt"
                color="red"
                @click="reset()"
              >
                {{ t('dashboard.buttons.reset') }}
              </UButton>
            </div>

            <div v-if="guestErrors.length" class="mt-4 rounded-xl bg-gray-50 p-4 ring-1 ring-gray-100">
              <div v-if="fileErrors.length">
                <div class="">
                  <div class="flex items-center gap-1.5 text-red-500">
                    <UIcon color="red" name="i-heroicons-exclamation-circle-20-solid" class="size-6" />
                    <p class="font-bold leading-6 tracking-wide">
                      {{ t('dashboard.upload_errors') }}
                    </p>
                  </div>

                  <div class="mt-4 divide-y divide-red-100 rounded-md border border-red-100 bg-white p-2">
                    <div v-for="guestError in guestErrors" :key="guestError" class="p-1 px-2">
                      <strong class="mr-2">Row  #{{ guestError.displayIndex }}</strong>
                      <span v-for="gE in guestError.errors" :key="gE.path">
                        {{ $t(`form.${gE.path}`) }} {{ gE.error }}.
                      </span>
                    </div>
                  </div>

                  <div class="mt-8">
                    <UButton
                      size="md"
                      color="white"
                      @click="reset()"
                    >
                      {{ t('dashboard.buttons.reupload') }}
                    </UButton>
                  </div>
                </div>
              </div>

              <div v-if="importState">
                <h3 class="text-xl font-bold">
                  {{ t('dashboard.import_finished') }}
                </h3>
                <div class="mt-6">
                  <p v-if="importState.meta.successful" class="flex gap-1.5 font-bold leading-6 tracking-wide text-green-500">
                    <UIcon name="i-heroicons-check-circle-20-solid" class="size-6" />
                    {{ importState.meta.successful || 0 }} / {{ importState.meta.total }}  {{ t('dashboard.import_meta.successful') }}.
                  </p>
                  <p v-if="importState.meta.failed" class="flex gap-1.5 font-bold leading-6 tracking-wide text-red-500">
                    <UIcon color="red" name="i-heroicons-exclamation-circle-20-solid" class="size-6" />
                    {{ importState.meta.failed }}  / {{ importState.meta.total }} {{ t('dashboard.import_meta.failed') }}.
                  </p>
                </div>

                <div v-if="importState.meta.failed" class="mt-4">
                  <div class="space-y-1">
                    <div v-for="guestError in guestErrors" :key="guestError">
                      <strong class="mr-2">Row  #{{ guestError.displayIndex }}</strong>
                      <span v-for="gE in guestError.errors" :key="gE.path">
                        {{ gE.message }}
                      </span>
                    </div>
                  </div>

                  <UButton :loading="importLoading" class="mt-3" @click="ExportErroredGuests()">
                    {{ t('dashboard.buttons.export_errors') }}
                  </UButton>
                </div>
              </div>
            </div>

            <div v-if="guests.length" class="mt-4 border-y border-gray-100 lg:my-6">
              <div class="">
                <UTable
                  :loading="fileLoading || importLoading"
                  :rows="guests"
                  :columns="columns"
                >
                  <template #valid-data="{ row }">
                    <UIcon v-if="row.errors && row.errors.length" name="i-heroicons-x-mark" class="size-5 text-red-500" />
                    <UIcon v-else name="i-heroicons-check" class="size-5 text-green-500" />
                  </template>
                </UTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
const localeRoute = useLocaleRoute()
const { namedAlert } = useAlert()

const { guests, guestErrors, readFile, fileLoading, fileErrors, reset, importState, importLoading, writeFile } = useGuestImporter()

async function upload(files) {
  if (!files.length) { return }
  fileLoading.value = true

  const file = await readFile(files[0])
  if (!file.rows.length) {
    namedAlert('general_file_import_error')
    fileLoading.value = false
    reset()
  }
  else {
    guests.value = file.rows
    fileErrors.value = file.errors
    fileLoading.value = false
  }
}

async function importGuests() {
  importLoading.value = true
  importState.value = null
  // await new Promise(resolve => setTimeout(resolve, 10_000))
  try {
    const importResponse = await $fetch('/api/guest/import', {
      method: 'post',
      body: guests.value,
    })
    // console.dir(importResponse)
    importState.value = importResponse

    if (importState.value.meta.total === importState.value.meta.successful) {
      importLoading.value = false
      await namedAlert('general_file_import_success', 'success').then(() => {
        navigateTo(localeRoute({ path: '/dashboard' }))
      })
    }
  }
  catch (e) {
    importState.value = e.data.data
  }
  finally {
    guests.value = importState.value.results.map((r) => {
      return { ...r.payload, errors: r.error && r.error.data }
    })
    importLoading.value = false
  }
}

const columns = [
  {
    key: 'displayIndex',
    label: '#',
    class: 'w-[18px]',
  },
  {
    key: 'valid',
    label: 'Status',
    class: 'w-[18px]',
  },
  {
    key: 'contact.first_name',
    label: t('form.contact.first_name'),
  },
  {
    key: 'contact.last_name',
    label: t('form.contact.last_name'),
  },
  {
    key: 'contact.email',
    label: t('form.contact.email'),
  },
  {
    key: 'contact.company_name',
    label: t('form.contact.company_name'),
  },
  {
    key: 'contact.sex',
    label: t('form.contact.sex'),
  },
  // {
  //   key: 'extended_fields.select_option',
  //   label: 'Select',
  // },
]

async function ExportErroredGuests() {
  importLoading.value = true
  await writeFile(guests.value)
  importLoading.value = false
}
</script>
