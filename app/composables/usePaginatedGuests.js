export default function usePaginatedGuests(userCode) {
  const loading = ref(false)
  const error = ref(null)
  const guests = ref([])
  const progress = ref({ current: 0, total: 0, percentage: 0 })

  const fetchGuestsPage = async (page = 1, timeout = 30000, config) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await $fetch('/api/guest/list', {
        method: 'POST',
        body: { code: userCode, page, config },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      return response
    }
    catch (err) {
      clearTimeout(timeoutId)
      if (err.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeout}ms`)
      }
      throw err
    }
  }

  const fetchAllGuests = async (config = {}) => {
    if (!userCode) {
      error.value = 'User code is required'
      return
    }

    loading.value = true
    error.value = null
    guests.value = []
    progress.value = { current: 0, total: 0, percentage: 0 }

    try {
      // First, fetch the first page to get pagination info
      const firstPage = await fetchGuestsPage(1, 30000, config)

      if (firstPage.error) {
        throw new Error(firstPage.error)
      }

      const { data: firstPageData, meta } = firstPage
      const totalPages = meta.pagination.total_pages

      progress.value.total = totalPages
      progress.value.current = 1
      progress.value.percentage = (1 / totalPages) * 100

      // Start with the first page data
      guests.value = [...firstPageData.guests]

      // If there are more pages, fetch them concurrently (but limit concurrency)
      if (totalPages > 1) {
        const remainingPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2)
        const batchSize = 1 // Limit concurrent requests to avoid overwhelming the server

        for (let i = 0; i < remainingPages.length; i += batchSize) {
          const batch = remainingPages.slice(i, i + batchSize)

          const batchPromises = batch.map(page =>
            fetchGuestsPage(page, 30000, config).then((response) => {
              if (response.error) {
                throw new Error(response.error)
              }
              return { page, data: response.data.guests }
            }),
          )

          try {
            const batchResults = await Promise.all(batchPromises)

            // Add the results to guests array
            batchResults.forEach(({ data }) => {
              guests.value.push(...data)
            })

            // Update progress
            progress.value.current = Math.min(1 + i + batchSize, totalPages)
            progress.value.percentage = (progress.value.current / totalPages) * 100
          }
          catch (batchError) {
            console.error('Error in batch:', batchError)
            // Continue with next batch - don't fail entirely
          }
        }
      }

      progress.value.current = totalPages
      progress.value.percentage = 100
    }
    catch (err) {
      error.value = err.message || 'Failed to fetch guests'
      console.error('Error fetching guests:', err)
    }
    finally {
      loading.value = false
    }
  }

  const refresh = () => fetchAllGuests()

  return {
    loading: readonly(loading),
    error: readonly(error),
    guests: readonly(guests),
    progress: readonly(progress),
    fetchAllGuests,
    refresh,
  }
}
