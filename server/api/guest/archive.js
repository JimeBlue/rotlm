export default defineEventHandler(async (event) => {
  const { eventId, api } = useSuite(event)
  const { code } = await readBody(event)

  try {
    const response = await api(event, `/events/${eventId}/guests/${code}/archive`, {
      method: 'put',
    })
    console.log('archive', response)
    return response
  }
  catch (error) {
    console.log('error', error)
  }
})
