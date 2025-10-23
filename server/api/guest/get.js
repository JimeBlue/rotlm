import { guestStore } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event)

  try {
    // For demo purposes, treat code as guest ID
    // In real app, code would be a lookup key
    const guest = await guestStore.getById(code)
    
    if (!guest) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Guest not found'
      })
    }

    // Return in the expected format
    return guest
  }
  catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Failed to fetch guest',
      data: error 
    })
  }
})
