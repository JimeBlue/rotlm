import { guestStore } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const guests = [body, ...(body?.companion_guests || [])]

    const results = []
    
    for (const guest of guests) {
      // Clean up data
      if (guest.role === 'main') { 
        delete guest.companion_guests 
      }


      if (guest.code || guest.id) {
        // Update existing guest
        const guestId = guest.code || guest.id
        
        try {
          if (['archived', 'deleted'].includes(guest.status)) {
            await guestStore.delete(guestId)
            results.push({ status: 'success', guest: { ...guest, status: 'archived' } })
          }
          else {
            const updatedGuest = await guestStore.update(guestId, guest)
            if (updatedGuest) {
              results.push({ status: 'success', guest: updatedGuest })
            } else {
              results.push({
                status: 'error',
                error: { message: 'Guest not found', code: guestId },
                payload: guest,
              })
            }
          }
        }
        catch (e) {
          results.push({
            status: 'error',
            error: { message: e.message, code: guestId },
            payload: guest,
          })
        }
      }
      else {
        // Create new companion guest
        try {
          const newGuest = await guestStore.create({
            ...guest,
            status: guest.status || 'pending'
          })
          results.push({ status: 'success', guest: newGuest })
        }
        catch (e) {
          results.push({
            status: 'error',
            error: { message: e.message },
            payload: guest,
          })
        }
      }
    }

    return results
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update guests'
    })
  }
})
