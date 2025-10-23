import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', () => {
  const { $api } = useNuxtApp()
  const event = ref(null)
  const myEvents = ref(null)
  const currentEvent = ref(null)
  const guest = ref(null)

  const reset = () => {
    event.value = null
    myEvents.value = null
  }

  const getEvent = async () => {
    try {
      const data = await $api('/api/event/get')
      event.value = data
      return data
    }
    catch (error) {
      throw createError(error)
    }
  }

  const getMyEvents = async (code = useAuthStore().user.contact.code) => {
    try {
      const data = await $fetch('/api/contact/get-events', {
        query: { code },
      })
      myEvents.value = data
      return data
    }
    catch (error) {
      throw createError(error)
    }
  }

  return {
    event,
    myEvents,
    currentEvent,
    guest,
    getEvent,
    getMyEvents,
    reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventStore, import.meta.hot))
}
