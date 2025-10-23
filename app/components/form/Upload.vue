<template>
  <div>
    <template v-if="model">
      <div class="flex items-center gap-x-2">
        <button
          v-if="showInlinePreview && preview && preview.method === 'inline'"
          type="button"
          class="focus-visible:outline-primary-500 grid place-content-center items-center rounded-full"
          aria-label="Preview"
          @click="handlePreview"
        >
          <span class="size-10 overflow-hidden rounded-full">
            <img class="size-full object-cover object-center" alt="" :src="preview.url">
          </span>
        </button>

        <UInput
          class="w-full"
          disabled
          :icon="props.icon"
          :placeholder="currentFile.file_name"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <div class="flex items-center gap-x-2">
              <UButton
                color="neutral"
                variant="soft"
                :icon="props.iconPreview"
                aria-label="Preview"
                @click="handlePreview"
              />

              <UButton
                color="error"
                variant="soft"
                icon="heroicons:trash"
                aria-label="Delete"
                @click="softDelete()"
              />
            </div>
          </template>
        </UInput>
      </div>

      <UModal
        v-model:open="showPreviewModal"
        title="Preview"
        :description="fieldLabel"
        :ui="{ content: 'max-w-content' }"
      >
        <template #content>
          <img
            v-if="preview"
            :src="preview.url"
            class="h-auto w-full max-w-2xl"
            alt=""
          >
        </template>
      </UModal>
    </template>

    <template v-else>
      <UInput
        :id="id"
        :value="model"
        :name="name"
        :icon="props.icon"
        :accept="props.accept"
        placeholder="Upload"
        :loading="loading"
        :disabled="loading"
        type="file"
        class="w-full"
        @change="handleUpload"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: { type: String, default: 'fa6-regular:file' }, // fa6-regular:file-image
  iconPreview: { type: String, default: 'heroicons:eye' }, // heroicons:arrow-down-tray
  accept: { type: String, default: 'image/png, image/jpeg, application/pdf' },
  field: { type: String, required: true },
  fieldLabel: { type: String, required: true },
  showInlinePreview: { type: Boolean, default: true },
  maxSize: { type: Number, default: 20 },
  maxSizeResizable: { type: Number, default: 10 },
  for: { type: Object, default: () => {} },
})

const emit = defineEmits(['fileUploaded'])

const model = defineModel<string | null>()

const { id, name } = useFormField()

const showPreviewModal = ref(false)

const {
  loading,
  currentFile,
  upload,
  softDelete,
  preview,
} = useUpload({ field: props.field, model, maxSize: props.maxSize, maxSizeResizable: props.maxSizeResizable, guest: props.for })

async function handleUpload(event: Event) {
  const { files = null } = event.target
  await upload(files)
  emit('fileUploaded', props.field)
}

async function handlePreview() {
  if (!preview.value) { return }

  if (preview.value.method === 'inline') {
    showPreviewModal.value = true
  }

  if (['window', 'download'].includes(preview.value.method)) {
    window.open(preview.value.url, '_blank')
  }
}
</script>
