import { guestStore } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // For demo purposes, skip auth validation
    // In a real app, you'd validate user access here
    
    const page = body?.page || 1
    const config = body?.config || {}
    const perPage = config.perPage || 250
    
    let allGuests = await guestStore.getAll()
    
    // Apply filters if provided
    if (config.filters) {
      for (const filter of config.filters) {
        if (filter.field === 'status' && filter.operator === 'eq') {
          allGuests = allGuests.filter(guest => guest.status === filter.value)
        }
        if (filter.field === 'role' && filter.operator === 'eq') {
          allGuests = allGuests.filter(guest => guest.extended_fields?.role === filter.value)
        }
      }
    }
    
    // Pagination
    const offset = (page - 1) * perPage
    const paginatedGuests = allGuests.slice(offset, offset + perPage)
    
    return {
      data: {
        guests: paginatedGuests
      },
      meta: {
        pagination: {
          current_page: page,
          total_pages: Math.ceil(allGuests.length / perPage),
          total: allGuests.length,
          per_page: perPage
        }
      }
    }
  }
  catch (error) {
    console.error('Error fetching guests:', error)
    setResponseStatus(event, 500)
    return { error: 'Failed to fetch guests data' }
  }
})
