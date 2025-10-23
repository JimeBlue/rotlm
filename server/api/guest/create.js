import { guestStore } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  try {
    const guestData = await readBody(event)
    
    // Basic validation
    if (!guestData.contact?.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required',
        data: { 
          errors: { 'contact.email': ['Email is required'] },
          guest: guestData 
        }
      })
    }

    // Handle companions
    guestData.companion_guests = guestData?.companions || guestData.companion_guests || []
    
    const newGuest = await guestStore.create(guestData)
    
    return { 
      data: newGuest,
      message: 'Guest created successfully'
    }
  }
  catch (e) {
    if (e.statusCode) {
      throw e
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create guest',
      data: { errors: { general: ['An unexpected error occurred'] } }
    })
  }
})
