import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const userCookie = useCookie('user')
  const intendedRoute = useCookie('intended_route')

  if (!to.name) { return abortNavigation() }

  const authStore = useAuthStore()
  const { loggedIn } = storeToRefs(useAuthStore())
  const code = ref(to.query?.code || userCookie.value?.code || userCookie.value)
  const userType = ref(to.query?.type || userCookie.value?.type || 'guest')

  // login page skip checks and return
  if (to.path === '/login') { return }

  if (['blank', 'public'].includes(to.meta.layout)) {
    if (!loggedIn.value && code.value) {
      if (userType.value === 'contact') {
        await authStore.contactLogin(code.value)
      } else {
        await authStore.login(code.value)
      }
    }
    return
  }

  if (!loggedIn.value) {
    intendedRoute.value = to.path
    const path = '/login'
    if (!code.value) { return navigateTo({ path }) }

    let success
    if (userType.value === 'contact') {
      success = await authStore.contactLogin(code.value)
    } else {
      success = await authStore.login(code.value)
    }

    if (!success) { return navigateTo({ path }) }

    return
  }

  if (intendedRoute.value) {
    const newTo = intendedRoute.value
    intendedRoute.value = null
    return navigateTo(newTo)
  }
})
