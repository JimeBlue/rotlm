import { contactStore } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event)

  try {
    // For demo purposes, treat code as contact ID
    const contact = await contactStore.getById(code)
    
    if (!contact) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Contact not found'
      })
    }

    return { contact }
  }
  catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Failed to fetch contact',
      data: error 
    })
  }
})
