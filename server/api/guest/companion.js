import { guestStore } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  try {
    const guest = await readBody(event)

    const result = guest.code
      ? await guestStore.update(guest.code, guest)
      : await guestStore.create(guest)

    return result
  }
  catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create/update companion',
      data: { errors: { general: ['An error occurred'] }, guest }
    })
  }
})
