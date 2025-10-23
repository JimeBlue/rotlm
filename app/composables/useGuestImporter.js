import readXlsxFile from 'read-excel-file'
import writeXlsxFile from 'write-excel-file'
import * as yup from 'yup'

export function useGuestImporter() {
  const { locale } = useI18n()

  const fileLoading = ref(false)
  const fileErrors = ref([])

  const guests = ref([])
  const guestErrors = computed(() => guests.value.filter(g => g.errors && g.errors.length))

  const importState = ref(null)
  const importLoading = ref(false)

  const guestSchema = yup.object({
    contact: yup.object({
      sex: yup.string().oneOf(['male', 'female', 'diverse'], 'Invalid').required('Sex is required'),
      title: yup.string().optional(),
      first_name: yup.string().required('First name is required'),
      last_name: yup.string().required('Last name is required'),
      company_name: yup.string().optional(),
      email: yup.string().email('Invalid email').required('Email is required'),
    }),
  })

  const columnMapping = {
    en: {
      CONTACT: {
        contact: {
          'Sex': 'sex',
          'Title': 'title',
          'First Name': 'first_name',
          'Last Name': 'last_name',
          'Company': 'company_name',
          'Email': 'email',
        },
      },
      // EXTENDED_FIELDS: {
      //   extended_fields: {
      //     'Select Option': 'select_option',
      //   },
      // },
    },
    de: {
      CONTACT: {
        contact: {
          'Geschlecht': 'sex',
          'Titel': 'title',
          'Vorname': 'first_name',
          'Nachname': 'last_name',
          'Firma': 'company_name',
          'E-Mail': 'email',
        },
      },
      // EXTENDED_FIELDS: {
      //   extended_fields: {
      //     'Select Option': 'select_option',
      //   },
      // },
    },
  }

  function makeGuest(row, index) {
    return {
      ...row,
      status: 'listed',
      index,
      displayIndex: index + 1,
    }
  }

  async function readFile(input) {
    let fileRows = []
    const errors = []

    const file = await readXlsxFile(input, { map: columnMapping[locale.value] })
    // console.dir(file)

    fileRows = file.rows.map((row, index) => {
      const parsed = guestSchema.safeParse(row)
      if (parsed.success) {
        return makeGuest(parsed.data, index)
      }
      else {
        const error = parsed.error.errors.map(err => ({
          row: index + 2,
          path: err.path.join('.'),
          error: err.message,
          raw: err,
        }))
        errors.push(...error)
        return { ...makeGuest(row, index), errors: error, class: 'bg-red-50' }
      }
    })

    return { rows: fileRows, errors }
  }

  function reset() {
    guests.value = []
    fileErrors.value = []
    importState.value = null
    importLoading.value = false
    fileLoading.value = false
  }

  const exportSchema = Object.entries(columnMapping[locale.value]).flatMap(section =>
    Object.entries(section[1]).flatMap(([groupKey, groupValue]) =>
      Object.entries(groupValue).map(([label, key]) => ({
        column: label,
        type: String,
        value: entry => entry[groupKey]?.[key] || '',
      })),
    ),
  )

  async function writeFile(input) {
    await writeXlsxFile(input, {
      schema: exportSchema,
      fileName: 'file.xlsx',
    })
  }

  return {
    readFile,
    fileLoading,
    fileErrors,
    guests,
    guestErrors,
    reset,
    importState,
    importLoading,
    writeFile,
  }
}
