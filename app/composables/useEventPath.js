export function useEventPath() {
  const localePath = useLocalePath()
  const config = useRuntimeConfig()
  const eventStore = useEventStore()
  const { event } = storeToRefs(eventStore)

  const eventPath = (path = '', eventId = null) => {
    const id = eventId || event.value?.id || config.public.eventId
    if (!id) return localePath(path)
    
    const eventBasePath = `/${id}`
    const fullPath = path ? `${eventBasePath}/${path.replace(/^\//, '')}` : eventBasePath
    return localePath(fullPath)
  }

  return {
    eventPath
  }
}