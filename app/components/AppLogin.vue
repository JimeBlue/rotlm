<template>
  <UForm
    :state="form"
    :validate="validate"
    @submit="authenticate"
    @error="showErrors"
  >
    <div class="grid grid-cols-[3fr_2fr] gap-1 antialiased">
      <UFormField name="code" :ui="{ error: 'hidden' }">
        <UInput v-model.trim="form.code" placeholder="Code eingeben" />
      </UFormField>

      <UButton
        type="submit"
        :loading="submitting"
        size="sm"
        class="flex justify-center"
      >
        <span>Login</span>
      </UButton>
    </div>
  </UForm>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'guest',
    validator: value => ['guest', 'contact'].includes(value),
  },
})

const route = useRoute()
const localeRoute = useLocaleRoute()
const { t } = useI18n()
const userCookie = useCookie('user')
const { namedAlert } = useAlert()

const authStore = useAuthStore()
const { login, contactLogin } = authStore

const eventStore = useEventStore()
const { getMyEvents } = eventStore

const form = ref({ code: route.query?.code || userCookie.value?.code || userCookie.value })
const submitting = ref(false)

const loginType = computed(() => route.query?.type || props.type || 'guest')

const showErrors = () => namedAlert('incomplete', 'error')

async function authenticate() {
  submitting.value = true

  let response
  if (loginType.value === 'contact') {
    response = await contactLogin(form.value.code)
    if (response) {
      await getMyEvents()
    }
  }
  else {
    response = await login(form.value.code)
  }

  submitting.value = false

  if (!response) {
    return namedAlert('code_not_found', 'error')
  }

  // await getEvent()
  const path = '/'
  navigateTo(localeRoute({ path }))
}

function validate(state) {
  const errors = []
  if (!state.code) {
    errors.push({ path: 'code', message: 'required' })
  }

  return errors
}

onMounted(async () => {
  if (form.value.code) { setTimeout(() => authenticate(), 100) }
})
</script>
