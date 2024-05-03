require('dotenv').config()

const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  async function main() {
    try {
      const info = await transporter.sendMail({
        from: '"Felix Ozuna 👻" <ozunafelix019@gmail.com>',
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
      })

      console.log('Message sent: %s', info.messageId)
    } catch (error) {
      console.error('Error sending email: ', error)
    }
  }

  await main()
})

module.exports = sendEmail
