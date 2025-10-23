import { eventStore } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  try {
    const eventData = await eventStore.get()
    
    if (!eventData) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Event not found'
      })
    }

    // Mock field definitions for form fields
    const field_definitions = {
      event: {},
      guest: {
        test_multiselect: {
          key: 'test_multiselect',
          type: 'multiselect',
          label: 'Categories',
          options: [
            { value: 'tech', label: 'Technology' },
            { value: 'business', label: 'Business' },
            { value: 'design', label: 'Design' }
          ]
        }
      },
      contact: {},
      booking: {}
    }

    const now = new Date()
    const registration_closed = !eventData.settings.registration_open

    return {
      ...eventData,
      field_definitions,
      registration_closed,
    }
  }
  catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch event data'
    })
  }
})
