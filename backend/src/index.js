import env from './main/config/index'
import server from './main/config/app'
import { NodemailerHelper } from './infra/email/helper/nodemailer-helper'
NodemailerHelper.createTransporter({
  host: env.email_host,
  port: env.email_port,
  auth: {
    user: env.email_user,
    pass: env.email_password
  }
})
server.listen(env.port, () => {
  console.log('server running')
})
