export default function (event, request, opts) {
  const {
    apiUrl,
    apiKey,
  } = useRuntimeConfig()

  // const token = getCookie(event, 'token') || 0

  const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'x-api-key': apiKey,
    ...opts?.headers,
  }

  return $fetch(request, {
    baseURL: apiUrl,
    ...opts,
    headers,
  })
}
