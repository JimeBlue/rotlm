// Mock replacement for useSuite - returns demo event ID
export function useSuite(event) {
  const config = useRuntimeConfig()
  
  // For demo purposes, always return the portfolio event ID
  const eventId = 'portfolio-event-2024'
  const locale = event?.node.req.headers['accept-language'] || 'en-GB'

  function api(event, request, opts) {
    // This is a mock function - in real implementation
    // this would make actual API calls
    console.log(`Mock API call to: ${request}`)
    return Promise.resolve({ data: null })
  }

  return { eventId, api, locale }
}
