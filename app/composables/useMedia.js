import Compressor from 'compressorjs'

export function useMedia() {
  function compressImage(file, quality = 0.6, limit = 2) {
    const targetSizeBytes = limit * 1024 * 1024

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-new
      new Compressor(file, {
        quality,
        success(result) {
          console.log('Compressed Blob:', result, 'Size (bytes):', result.size)

          if (result.size <= targetSizeBytes || quality <= 0.1) {
            const compressedFile = new File([result], file.name, { type: file.type })
            resolve(compressedFile)
          }
          else {
            const newQuality = Math.max(quality - 0.1, 0.1)
            resolve(compressImage(file, newQuality))
          }
        },
        error(err) {
          reject(err)
        },
      })
    })
  }

  async function prepareImage(file, options = { maxSizeMB: 2, initialQuality: 0.6 }) {
    const sizeMB = file.size / 1_000_000
    if (sizeMB < options.maxSizeMB) {
      return file
    }

    try {
      return await compressImage(file, options.initialQuality, options.maxSizeMB)
    }
    catch (err) {
      console.error('Compression failed:', err)
      return file // Fallback to original if compression fails
    }
  }

  function previewFile(file) {
    if (!file) { return null }

    if (file instanceof File) {
      return URL.createObjectURL(file)
    }

    // In case it's a file-like object with a URL
    if (typeof file.url === 'string') {
      return file.url
    }

    return null
  }

  function mapExtensionToMime(ext) {
    const mimeMap = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      pdf: 'application/pdf',
    }

    return mimeMap[ext.toLowerCase()]
  }

  return {
    compressImage,
    prepareImage,
    previewFile,
    mapExtensionToMime,
  }
}
