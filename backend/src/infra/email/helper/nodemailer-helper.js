import { createTransport } from 'nodemailer'

export const NodemailerHelper = {
  transporter: null,
  emailSender: null,
  createTransporter (transporter, email) {
    if (!this.transporter) {
      this.emailSender = email
      this.transporter = createTransport(transporter)
    }
  },
  async sendEmail (emailSubject, recipientEmail, bodyMessage) {
    if (this.transporter) {
      await this.transporter.sendMail({
        from: this.emailSender,
        to: recipientEmail,
        subject: emailSubject,
        html: bodyMessage
      })
    }
  }
}