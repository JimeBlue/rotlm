import * as yup from 'yup'

export function useFormValidations() {
  const { t } = useI18n()
  const isEmail = (requiredMessage = 'Must be a valid email address') =>
    yup
      .string()
      .required(t('validations.required'))
      .matches(/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/, requiredMessage)

  return { isEmail }
}
