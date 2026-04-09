import { Resend } from 'resend'
import { createClient } from '@sanity/client'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { first_name, last_name, email, phone, message, consent, mode, product_id, product_name } = body

  if (!first_name || !last_name || !email || !message || !consent) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const isOrder = mode === 'order'

  // --- Resend ---
  const resend = new Resend(config.resendApiKey)

  await resend.emails.send({
    from: 'Raiders of the Lost Missile <onboarding@resend.dev>',
    to: config.resendToEmail,
    subject: isOrder ? `New merch order: ${product_name}` : 'New contact message',
    html: isOrder
      ? `
        <h2>New merch order received</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Product</strong></td><td>${product_name}</td></tr>
          <tr><td><strong>Name</strong></td><td>${first_name} ${last_name}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ''}
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `
      : `
        <h2>New contact message received</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${first_name} ${last_name}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ''}
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
  })

  // --- Sanity ---
  if (config.sanityApiToken && isOrder) {
    const sanity = createClient({
      projectId: 'wr3ekkel',
      dataset: 'production',
      apiVersion: '2024-01-01',
      token: config.sanityApiToken,
      useCdn: false,
    })

    await sanity.create({
      _type: 'merchOrder',
      product_id,
      product_name,
      customer: { first_name, last_name, email, ...(phone && { phone }) },
      message,
      status: 'new',
      submitted_at: new Date().toISOString(),
    })
  }

  return { success: true }
})
