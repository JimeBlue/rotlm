import { buildCalendarEvent } from '~/utils/icsBuilder.js'

export function useDownloadCalendar() {
  const { locale } = useI18n()

  function downloadCalendar(data) {
    const isWindows =
      typeof navigator !== 'undefined' &&
      (navigator.userAgentData?.platform?.includes('Windows') ||
       navigator.userAgent?.includes('Windows'))

    const { icsContent, filename } = buildCalendarEvent({
      ...data,
      locale: locale.value,
      isWindows,
    })

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    link.click()

    URL.revokeObjectURL(url)
  }

  return downloadCalendar
}
