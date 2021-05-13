export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  email_host: process.env.EMAIL_HOST || '',
  email_port: process.env.EMAIL_PORT || '',
  email_user: process.env.EMAIL_USER || '',
  email_password: process.env.EMAIL_PASSWORD || '',
  db_name:process.env.DB_NAME || 'user-register',
  db_user:process.env.DB_USER || 'postgres',
  db_password:process.env.DB_PASSWORD || 'root'
}
