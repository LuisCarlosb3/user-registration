import { NodemailerHelper } from './helper/nodemailer-helper'
export class EmailService {
  async sendNewUserMessage(userEmail){
    const message = `
    <html>
      <h2>Bem-vindo ao nosso maravilhoso serviço</h2>
      <p>
        Esperamos que você aproveite
      </p>
    </html>
    `
    await NodemailerHelper.sendEmail('Bem-vindo', userEmail, message)
  }
}