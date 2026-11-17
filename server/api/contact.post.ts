import { Resend } from 'resend'

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { first_name, last_name, email, phone, message, consent } = body ?? {}

  if (!first_name || !last_name || !email || !message || !consent) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const resend = new Resend(config.resendApiKey)

  const safeName = `${escapeHtml(first_name)} ${escapeHtml(last_name)}`
  const safeEmail = escapeHtml(email)

  const { error } = await resend.emails.send({
    from: 'Raiders of the Lost Missile <onboarding@resend.dev>',
    to: config.resendToEmail,
    replyTo: String(email),
    subject: `New contact message from ${String(first_name).replace(/[\r\n]+/g, ' ')} ${String(last_name).replace(/[\r\n]+/g, ' ')}`,
    html: `
      <h2>New contact message received</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${safeName}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        ${phone ? `<tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>` : ''}
        <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${escapeHtml(message)}</td></tr>
      </table>
    `,
  })

  if (error) {
    console.error('Resend failed to send contact email:', error)
    throw createError({ statusCode: 502, statusMessage: 'Failed to send message' })
  }

  return { success: true }
})
