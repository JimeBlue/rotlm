import type { Ref } from 'vue'
import { computed, isRef, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAlert } from '~/composables/useAlert'
import { useMedia } from '~/composables/useMedia'
import { useAuthStore } from '~/stores/auth'

interface UseUploadOptions {
  field: string
  model: Ref<string | null>
  maxSize: number
  maxSizeResizable: number
  guest: object
}

export function useUpload({ field, model, maxSize = 20, maxSizeResizable = 10, guest }: UseUploadOptions) {
  const loading = ref(false)

  const { $api } = useNuxtApp()
  const { t } = useI18n()
  const { Alert } = useAlert()
  const { prepareImage, previewFile, mapExtensionToMime } = useMedia()

  const previewable = {
    inline: ['image/jpeg', 'image/png', 'image/svg'],
    window: ['application/pdf'],
  }

  const resizable = ['image/jpeg', 'image/png']

  const formStore = useFormStore()
  const { form } = storeToRefs(formStore)

  const currentFile = computed(() => {
    // if (guest === 'guest') {
    return guest.files.find(f => f.key === field) || false
    // }

    const match = guest.match(/^companion\.(\d+)$/)
    if (match) {
      const index = Number(match[1])
      const companion = form.value.companion_guests[index].files
      return companion?.find(f => f.key === field) || false
    }

    return false
  })

  const preview = computed(() => {
    if (!currentFile.value) { return null }

    let mime = null
    let url = null
    if (currentFile.value.uuid) {
      mime = mapExtensionToMime(currentFile.value.extension)
      url = currentFile.value.original_url
    }
    else {
      mime = currentFile.value.file.type
      url = previewFile(currentFile.value.file)
    }

    const method = previewable.inline.includes(mime)
      ? 'inline'
      : previewable.window.includes(mime)
        ? 'window'
        : 'download' // Default to 'download'

    return { mime, method, url }
  })

  function replaceFile(newFile: File) {
    const newItem = {
      file_name: newFile.name,
      size: newFile.size,
      uuid: false,
      file: newFile,
      key: field,
    }

    // if (guest === 'guest') {
    const targetArray = guest.files
    const index = targetArray.findIndex(f => f.key === field)
    index !== -1 ? targetArray[index] = newItem : targetArray.push(newItem)
    return targetArray
    // }

    const match = guest.match(/^companion\.(\d+)$/)
    if (match) {
      const index = Number(match[1])

      // if (!form.value.companion_guests[index].files) {
      guest.files = []
      // }

      const targetArray = guest.files
      const fileIndex = targetArray.findIndex(f => f.key === field)
      fileIndex !== -1 ? targetArray[fileIndex] = newItem : targetArray.push(newItem)
    }
  }

  async function upload(files: FileList, resize = true) {
    if (!files?.length) { return }
    console.log('enableResizing', resize)
    loading.value = true
    let file = files[0]

    const maxSizeBytes = maxSize * 1024 * 1024
    const maxSizeResizableBytes = maxSizeResizable * 1024 * 1024

    if (resize && resizable.includes(file.type)
      && (file.size > maxSizeBytes || file.size > maxSizeResizableBytes)
    ) {
      file = await prepareImage(file, { maxSizeMB: maxSizeResizable, initialQuality: 0.6 })
    }

    if (file.size > maxSizeBytes) {
      await Alert({
        icon: 'error',
        title: t('alerts.file_upload_exceeds_maximum.title'),
        text: t('alerts.file_upload_exceeds_maximum.text'),
        confirmButtonText: 'OK',
      })
      softDelete()
      return
    }

    replaceFile(file)

    try {
      const { url, uuid, bucket, key } = await $api('/api/event/upload/generate-url', {
        method: 'POST',
        body: { type: file.type },
      })

      const uploadResp = await fetch(url, {
        method: 'PUT',
        body: file,
      })

      if (!uploadResp.ok) { throw new Error('File upload failed') }

      await $api('/api/event/upload/save', {
        method: 'POST',
        body: {
          temporaryUrlData: { uuid, bucket, key },
          fileName: file.name,
          fileSize: file.size,
          fileMimeType: file.type,
        },
      })

      model.value = uuid
    }
    catch (error) {
      console.error('Upload failed:', error)
      await Alert({
        icon: 'error',
        title: t('alerts.file_upload_error.title'),
        text: t('alerts.file_upload_error.text'),
        confirmButtonText: 'OK',
      })
      softDelete()
    }
    finally {
      loading.value = false
    }
  }

  function softDelete() {
    if (isRef(model)) {
      model.value = null
    }
    loading.value = false
  }

  return {
    loading,
    currentFile,
    upload,
    softDelete,
    previewFile,
    previewable,
    preview,
  }
}
