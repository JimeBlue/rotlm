export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const loggedIn = !!body.code

  if (!loggedIn && !body.contact) {
    setResponseStatus(event, 401)
    return { error: 'Unauthorized' }
  }

  try {
    // Mock email sending - just log the email data
    const emailData = {
      sex: body.contact.sex,
      name: `${body.contact.first_name} ${body.contact.last_name}`,
      company: body.contact.company_name,
      email: body.contact.email,
      message: body.message,
    }
    
    console.log('📧 Mock Email Sent:')
    console.log('To:', emailData.email)
    console.log('From:', emailData.name, emailData.company ? `(${emailData.company})` : '')
    console.log('Message:', emailData.message)
    
    // Simulate successful email response
    return {
      success: true,
      message: 'Email sent successfully (mock)',
      data: emailData
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email'
    })
  }
})
