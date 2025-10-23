<template>
  <div v-if="form">
    <UForm
      ref="formRef"
      :state="form"
      :schema="schema[formSteps.step]"
      autocomplete="off"
      @submit="onSubmit"
      @error="onError"
    >
      <FormSteps
        :steps="steps"
        show-progress
        :submitting="formSubmitting"
        :labels="{ next: '', submit: '', previous: '' }"
      >
        <template #1>
          <FormsConfirmingStep1
            ref="step1Ref"
            v-model:form="form"
            :select-options="select_options_grouped"
          />
        </template>

        <template #2>
          <FormsConfirmingStep2
            ref="step2Ref"
            v-model:form="form"
            :select-options="select_options_grouped"
            @add-companion-guest="addCompanionGuest"
            @remove-companion-guest="removeCompanionGuest"
          />
        </template>
        <template #3>
          <FormSummary />
        </template>
      </FormSteps>
    </UForm>
  </div>
</template>

<script setup>
import * as yup from 'yup'

const { $api } = useNuxtApp()

const { t } = useI18n()
const { Alert, namedAlert } = useAlert()

const { createCompanionGuest } = useSuite()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { setUser } = authStore

const eventStore = useEventStore()
const { getEvent } = eventStore
const { event } = storeToRefs(eventStore)

const formStore = useFormStore()
const { form, formSubmitting, formErrors, serverErrors } = storeToRefs(formStore)
const { setFormData } = formStore

const stepStore = useStepStore()
const { view, formSteps } = storeToRefs(stepStore)

const {
  mapOptions,
  mapOptionsForCompanions,
  mapGroupOptions,
} = useForm()

const { setLocaleId } = useLocales()

setFormData()

const guest_select = computed(() => mapOptions({ field: 'field_2', showRemaining: true, event, form, user }))

const companion_guest_select = computed(() => mapOptionsForCompanions({ field: 'field_2', showRemaining: true, event, form, user }))

const select_options_grouped = computed(() => mapGroupOptions(guest_select, companion_guest_select))

const steps = computed(() => {
  const step_list = [
    { id: '1', title: t('form.steps.1') },
    { id: '2', title: t('form.steps.2') },
    { id: '3', title: t('form.steps.3') },
  ]

  if (form.value.role === 'companion') { return step_list.filter(s => ['3'].includes(s.id)) }

  return step_list
})

const formRef = useTemplateRef('formRef')
const step1Ref = useTemplateRef('step1Ref')
const step2Ref = useTemplateRef('step2Ref')

// Step validation schemas - read from step components
const schema = computed(() => {
  return {
    1: step1Ref.value?.schema || yup.object(),
    2: step2Ref.value?.schema || yup.object(),
    3: yup.object(), // Step 3 is summary, no validation needed
  }
})

async function onSubmit(FormSubmitEvent) {
  if (formSteps.value.next) {
    return (formSteps.value.step = formSteps.value.next)
  }

  formSubmitting.value = true
  let action = 'update'

  // use form data or use FormSubmitEvent data direct from the form submit event
  // const preparedData = cloneDeep(form.value)
  const preparedData = FormSubmitEvent.data
  if (preparedData.status === 'confirmed') {
    preparedData.send_automated_email = false
  }
  preparedData.status = 'confirmed'
  preparedData.contact.locale_id = setLocaleId(preparedData.contact.locale_id)

  if (preparedData?.companion_guests) {
    for (const guest of preparedData.companion_guests) {
      guest.status = 'confirmed'
      guest.contact.locale_id = setLocaleId(guest.contact.locale_id)
    }
  }

  if (!preparedData.code) {
    action = 'create'
  }

  try {
    const response = await $api(`/api/guest/${action}`, {
      method: 'post',
      body: preparedData,
    })
    if (action === 'create') {
      setUser(response.guest, response.guest.code)
      return view.value = 'confirmed'
    }

    let hasErrors = []
    if (Array.isArray(response)) {
      hasErrors = response.filter(r => r.status === 'error')

      if (hasErrors.length) {
        await getEvent()
        serverErrors.value = []
      }

      hasErrors.forEach((r) => {
        const error = r.error

        const { id, role } = r.payload
        let name = ''
        if (role === 'companion') {
          const index = form.value.companion_guests.findIndex(i => i.id === id)
          name = `companion_guests.${index}.`
        }

        for (const [key, value] of Object.entries(error.errors)) {
          serverErrors.value.push({
            message: value[0].message,
            name: `${name}${key}`,
          })
        }
      })
      if (hasErrors.length) {
        formRef.value.setErrors(serverErrors.value)
        formErrors.value = serverErrors.value

        await Alert({
          title: 'Error',
          text: formErrors.value.map(err => err.message).join('\n'),
          icon: 'error',
        })
        // await Alert({
        //   title: 'Error',
        //   text: 'Please check the form for validation errors.',
        //   icon: 'error',
        // })
      }
      else {
        const guestWithCompanions = {}
        const preparedCompanions = []
        response.forEach((g, i) => {
          if (i !== 0) {
            preparedCompanions.push(g.guest)
          }
        })
        guestWithCompanions.value = { ...response[0].guest, companion_guests: preparedCompanions }

        setUser(guestWithCompanions.value, response[0].guest.code)
        formSteps.value.step = steps.value[0].id
        return view.value = 'confirmed'
      }
    }
  }
  catch (e) {
    const error = e.data
    const errors = e.data.data.errors

    namedAlert(error.message, 'error')

    await getEvent()

    serverErrors.value = errors
    formErrors.value = errors
    formRef.value.setErrors(errors)
  }
  finally {
    formSubmitting.value = false
  }
}

async function onError(event) {
  // console.warn(event)

  await Alert({
    title: 'Error',
    text: event.errors.map(err => err.message).join('\n'),
    icon: 'error',
  })

  await nextTick()
  setTimeout(() => {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, 300)
}

async function addCompanionGuest() {
  if (form.value.companion_guests === null) { form.value.companion_guests = [] }
  const newGuest = createCompanionGuest()
  form.value.companion_guests.push(newGuest)
  await nextTick()
  const element = document.getElementById(`companion_guests.${newGuest.id}`)
  if (element) {
    element.querySelector('input:not([type="hidden"]):not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"]):not(:disabled)',
    )?.focus()
  }
}

async function removeGuestCall(index, action) {
  formSubmitting.value = true

  const preparedData = form.value.companion_guests[index]

  await $api('/api/guest/update', {
    method: 'post',
    body: preparedData,
  })

  // Show a success message
  await Alert({
    title: t('alerts.cancelled_guest.title'),
    text: t('alerts.cancelled_guest.text'),
    icon: 'success',
  })

  if (action === 'cancelled') {
    user.value.companion_guests[index] = cloneDeep(preparedData)
  }
  else {
    user.value.companion_guests.splice(index, 1)
    form.value.companion_guests.splice(index, 1)
  }

  formSubmitting.value = false
}
function removeCompanionGuest(id, _guestIndex, action = 'archived') {
  if (!form.value.companion_guests.length) { return }

  const index = form.value.companion_guests.findIndex(obj => obj.id === id)

  if (form.value.companion_guests[index].id.startsWith('local')) {
    form.value.companion_guests.splice(index, 1)
  }

  else {
    Alert({
      title: t('alerts.remove_guest.title'),
      text: t('alerts.remove_guest.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#3085d6',
      confirmButtonText: t('alerts.remove_guest.yes_cancel'),
      cancelButtonText: t('alerts.remove_guest.no_keep'),
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with cancelling the companion
        if (index !== -1) {
          form.value.companion_guests[index].status = action
        }

        removeGuestCall(index, action)
      }
    }).catch((error) => {
      console.error('Error in SweetAlert confirmation:', error)
    })
  }
}
</script>
