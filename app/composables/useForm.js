import { countries } from '@@/constants/'

export function useForm() {
  const { t } = useI18n()

  const { localeAlias } = useLocales()

  const mapOptions = ({
    group = 'guest',
    field,
    sort = false,
    isCompanion = false,
    companionIndex = 0,
    customLabel = false,
    showRemaining = false,
    event,
    form,
    user,
  }) => {
    if (!event.value) {
      console.error('mapOptions', 'no event data')
      return []
    }

    const theField = event.value.field_definitions[group][field]

    if (!theField) {
      console.error('mapOptions', `no field at ${field}`)
      return []
    }

    const map = {
      guest: 'extended_fields',
      booking: 'booking.extended_fields',
      contact: 'contact.extended_fields',
    }

    const fieldAddress = `${map[group]}.${field}`

    const mappedOptions = theField.options.map((option) => {
      let label = customLabel
        ? t(`form.${fieldAddress}_options.${option.key}`)
        : option.label[localeAlias.value]

      let enabled = true
      let saved = false

      if (isCompanion) {
        const savedValue = get(user.value?.companion_guests[companionIndex], fieldAddress, null)
        if (savedValue) { saved = savedValue === option.key }
      }
      else {
        const savedValue = get(user.value, fieldAddress, null)
        if (savedValue) { saved = savedValue === option.key }
      }

      if (option.limit !== null) {
        enabled = saved || !!option.remaining_limit

        if (showRemaining) {
          const available = option.remaining_limit
          if (available >= 1) { label = `${label} [${available} remaining]` }
        }
      }

      let selected = false
      if (isCompanion) {
        selected = option.key === get(form.value?.companion_guests[companionIndex], fieldAddress, false)
      }
      else {
        selected = option.key === get(form.value, fieldAddress, false)
      }

      return {
        id: option.id,
        label,
        value: option.key,
        limit: option.limit,
        remaining: option.remaining_limit || 0,
        order: option.order,
        disabled: !enabled,
        saved,
        selected,
        // option, // return original data for debug
      }
    })

    if (sort) { return mappedOptions.sort((a, b) => a.label.localeCompare(b.label)) }

    return mappedOptions
  }

  const mapOptionsForCompanions = (options) => {
    const companions = options.form.value.companion_guests

    return companions.map((_, index) =>
      mapOptions({ ...options, isCompanion: true, companionIndex: index }),
    )
  }

  const mapGroupOptions = (guestSelectRef, companionGuestSelectRef) => {
    const allSelections = [guestSelectRef.value, ...companionGuestSelectRef.value].flat()

    const newSelections = {}
    allSelections.forEach((opt) => {
      if (opt.selected && !opt.saved) {
        newSelections[opt.value] = (newSelections[opt.value] || 0) + 1
      }
    })

    function updateOptions(group) {
      return group.map((opt) => {
        const baseLabel = opt.label.split(' [')[0]
        const incomingRemaining = opt.remaining ?? (opt.limit ?? 0)
        const adjustment = newSelections[opt.value] || 0
        const remaining = Math.max(incomingRemaining - adjustment, 0)

        return {
          ...opt,
          remaining,
          disabled: remaining === 0,
          label: remaining >= 1 ? `${baseLabel} [${remaining} remaining]` : baseLabel,
        }
      })
    }

    const main = updateOptions(guestSelectRef.value)
    const companions = companionGuestSelectRef.value.map(updateOptions)

    return { main, companions }
  }

  const makeOptions = ({ options, field, group = 'contact', sort = true }) => {
    const mappedOptions = options.map((option) => {
      let id, value, key

      if (typeof option === 'string') {
        id = option
        value = option
        key = option
      }
      else {
        id = option.id
        value = option.value
        key = option.key
      }

      const label = t(`form.${group}.${field}_options.${key}`)

      return {
        id,
        label,
        value,
      }
    })

    if (sort) { return mappedOptions.sort((a, b) => a.label.localeCompare(b.label)) }

    return mappedOptions
  }

  const makeBoolean = () => {
    return [
      { id: useId(), label: 'True', value: true },
      { id: useId(), label: 'False', value: false },
    ]
  }

  const sortSelectionByOrder = (array, options) => {
    return [...array].sort((a, b) => (options.find(o => o.value === a)?.order - options.find(o => o.value === b)?.order))
  }

  const optionsForSex = makeOptions({ options: ['male', 'female', 'diverse'], field: 'sex', sort: false })

  const optionsForCountry = makeOptions({ options: countries, field: 'country' })

  return {
    mapOptions,
    mapOptionsForCompanions,
    mapGroupOptions,
    makeBoolean,
    optionsForSex,
    optionsForCountry,
    sortSelectionByOrder,
  }
}
