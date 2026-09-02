import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { first_name, last_name, email, phone, message, consent } = body

  if (!first_name || !last_name || !email || !message || !consent) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const resend = new Resend(config.resendApiKey)

  await resend.emails.send({
    from: 'Raiders of the Lost Missile <onboarding@resend.dev>',
    to: config.resendToEmail,
    subject: 'New contact message',
    html: `
      <h2>New contact message received</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${first_name} ${last_name}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ''}
        <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
      </table>
    `,
  })

  return { success: true }
})
