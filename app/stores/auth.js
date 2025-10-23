import { defineStore } from 'pinia'
import { useEventStore } from './event'
import { useFormStore } from './form'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()

  const userCookie = useCookie('user')
  const user = ref(null)
  const userType = ref(null)

  const isDev = useCookie('isDev', {
    default: () => null,
  })

  const loggedIn = computed(() => !!user.value)

  const userName = computed(() => loggedIn.value ? `${user.value.contact.first_name} ${user.value.contact.last_name}` : null)

  const userRole = computed(() => loggedIn.value ? user.value.role : null)

  const setUser = (data, code, type = 'guest') => {
    user.value = data
    if (code) {
      userCookie.value = { code, type }
    }
    userType.value = type
  }

  const logout = async () => {
    const localePath = useLocalePath()
    user.value = null
    userCookie.value = null
    userType.value = null
    useFormStore().reset()
    useEventStore().reset()
    await navigateTo(localePath('/login'))
  }

  const getContact = async (code = user.value?.code) => {
    try {
      const contact = await $api('/api/contact/get', {
        query: { code },
      })
      setUser(contact, code, 'contact')
      return contact
    }
    catch {
      return false
    }
  }

  const getGuest = async (code = user.value?.code) => {
    try {
      const guest = await $api('/api/guest/get', {
        query: { code },
      })
      setUser(guest, code, 'guest')
      return guest
    }
    catch {
      return false
    }
  }

  const getGuestFile = async (code = user.value?.code, id = null) => {
    try {
      const file = await $api('/api/guest/getFile', {
        query: { code, id },
      })
      return file
    }
    catch {
      return false
    }
  }

  const login = async (code = false) => {
    if (!code) { return false }

    const guest = await getGuest(code)
    if (!guest) {
      await logout()
      return false
    }

    return guest
  }

  const contactLogin = async (code = false) => {
    if (!code) { return false }

    const contact = await getContact(code)
    if (!contact) {
      await logout()
      return false
    }
    return contact
  }

  return {
    user,
    userType,
    userRole,
    getGuest,
    getContact,
    getGuestFile,
    userName,
    loggedIn,
    logout,
    isDev,
    setUser,
    login,
    contactLogin,
  }
})

if (import.meta.hot) { import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot)) }
