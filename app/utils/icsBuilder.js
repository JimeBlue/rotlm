import { format } from 'date-fns'

export function buildCalendarEvent({
  title,
  description = '',
  location = '',
  start,
  end = null,
  duration = 60,
  locale = 'en',
  isWindows = false,
  fixedTime = false,
}) {
  const language = locale === 'de' ? 'de-DE' : 'en-GB'
  const timezone = isWindows ? 'W. Europe Standard Time' : 'Europe/Berlin'

  const isoUtcPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z$/

  function assertIsoUtc(str, label) {
    if (!str) throw new Error(`[buildCalendarEvent] ${label} missing`)
    if (!isoUtcPattern.test(str)) {
      throw new Error(
        `[buildCalendarEvent] ${label} must be in ISO 8601 UTC format (e.g. 2025-10-03T08:00:00.000Z).`
      )
    }
    const d = new Date(str)
    if (Number.isNaN(d.getTime())) {
      throw new Error(`[buildCalendarEvent] invalid ${label} date`)
    }
    return d
  }

  function escapeICS(str) {
    if (typeof str !== 'string') return ''
    return str.replace(/[\\,;]/g, '\\$&').replace(/\r?\n/g, '\\n')
  }

  // Convert a Date to timezone-aware ICS string (Europe/Berlin)
  function toBerlinWallTimeFromDate(date) {
    const berlinString = date.toLocaleString('en-US', { timeZone: 'Europe/Berlin' })
    return format(new Date(berlinString), "yyyyMMdd'T'HHmmss")
  }

  // Convert a Date to fixed (floating) Berlin local time (no TZID)
  function toBerlinFloatingTime(date) {
    const berlinString = date.toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const [datePart, timePart] = berlinString.split(', ')
    const [month, day, year] = datePart.split('/')
    const [hour, minute, second] = timePart.split(':')

    const berlinAsLocalDate = new Date(year, month - 1, day, hour, minute, second)
    return format(berlinAsLocalDate, "yyyyMMdd'T'HHmmss")
  }

  // Validate and calculate start/end
  const startDate = assertIsoUtc(start, 'start')
  const endDate = end ? assertIsoUtc(end, 'end') : new Date(startDate.getTime() + duration * 60000)

  const dtstart = fixedTime
    ? toBerlinFloatingTime(startDate)
    : toBerlinWallTimeFromDate(startDate)

  const dtend = fixedTime
    ? toBerlinFloatingTime(endDate)
    : toBerlinWallTimeFromDate(endDate)

  const dtstamp = format(new Date(), "yyyyMMdd'T'HHmmss")
  const uid = `${new Date().toISOString()}-${Math.random().toString(36).slice(2)}`

  // ICS content
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'PRODID:-//Your App//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    fixedTime
      ? `DTSTART:${dtstart}`
      : `DTSTART;TZID="${timezone}":${dtstart}`,
    fixedTime
      ? `DTEND:${dtend}`
      : `DTEND;TZID="${timezone}":${dtend}`,
    `SUMMARY;LANGUAGE=${language}:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    'SEQUENCE:0',
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
  ]

  if (!fixedTime) {
    lines.push(
      'BEGIN:VTIMEZONE',
      `TZID:${timezone}`,
      'BEGIN:STANDARD',
      `DTSTART:${dtstart}`,
      'TZNAME:CET',
      'TZOFFSETFROM:+0100',
      'TZOFFSETTO:+0100',
      'END:STANDARD',
      'END:VTIMEZONE'
    )
  }

  lines.push('END:VCALENDAR')

  return {
    filename: title.replace(/\s+/g, '_').replace(/[^\w_-]/g, '') + '.ics',
    icsContent: lines.join('\r\n'),
  }
}
