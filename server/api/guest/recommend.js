export default defineEventHandler(async (event) => {
  const { eventId, api } = useSuite(event)
  const body = await readBody(event)
  try {
    const { data } = await api(event, `/events/${eventId}/guests/${body.code}/recommendations`, {
      method: 'post',
      body: { ...body, code: null, with_raw_error_messages: true, send_automated_email: true },
    })
    console.log('recommend', data)
    return data
  }
  catch (error) {
    console.log('error', error)
    throw createError(error)
  }
})
