import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const items = await readBody(event)
  const results = []
  const batchSize = 50 // Process 50 requests at a time
  const rateLimit = 100 // API limit of 100 per second
  const delayBetweenBatches = Math.ceil(1000 * batchSize / rateLimit) // Time in ms to wait between batches

  const meta = {
    total: 0,
    successful: 0,
    failed: 0,
  }

  // Process items in batches
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)

    // Process batch with concurrent requests
    const batchResults = await Promise.all(
      batch.map(async (item) => {
        try {
          const response = await createGuest(item)
          meta.successful++
          return {
            payload: item,
            success: true,
            result: response,
          }
        }
        catch (error) {
          console.log(error.data.data)
          meta.failed++
          return {
            payload: item,
            success: false,
            // errors: error.data.data.errors,
            error: { message: error.message, data: error.data.data.errors, status: error.status },
          }
        }
      }),
    )

    results.push(...batchResults)

    // Add delay before processing next batch if not the last batch
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches))
    }
  }

  meta.total = results.length

  if (results.every(result => !result.success)) {
    throw createError({
      statusCode: 422,
      statusMessage: 'All requests failed',
      data: { results, meta },
    })
  }

  return {
    results,
    meta,
  }
})

async function createGuest(item) {
  const response = await $fetch('/api/guest/create', {
    method: 'POST',
    body: item,
  })
  return response
}
