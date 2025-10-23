import { createGuestFromContact } from '@@/constants/'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useFormStore = defineStore('form', () => {
  const { createGuest } = useSuite()
  const authStore = useAuthStore()
  const { user, userType, loggedIn } = storeToRefs(authStore)

  const form = ref(null)

  const formSubmitted = ref(false)
  const formSubmitting = ref(false)
  const selected = ref(null)

  const formErrors = ref([])
  const serverErrors = ref([])

  const reset = () => { form.value = null }

  const setFormData = (data) => {
    if (data) {
      return form.value = data
    }

    if (!loggedIn.value) {
      return form.value = createGuest()
    }

    if (userType.value === 'guest') {
      form.value = cloneDeep(user.value)
    }

    if (userType.value === 'contact') {
      // Create guest structure and merge contact data
      form.value = createGuestFromContact(user.value.contact)
    }
  }

  return {
    form,
    selected,
    formSubmitted,
    formSubmitting,
    formErrors,
    serverErrors,
    setFormData,
    reset,
  }
})
if (import.meta.hot) { import.meta.hot.accept(acceptHMRUpdate(useFormStore, import.meta.hot)) }
