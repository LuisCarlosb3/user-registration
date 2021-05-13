import { UserRegistrationController } from '../../presentation/controllers/user-registration'
import { UserRegistrationValidation } from '../../validation/user-registration-validation'
import { UserRepository } from '../../infra/db/repositories/user-repository'
import { EmailService } from '../../infra/email/email-service'
import { HashCrypt } from '../../infra/crypt/hash-crypt'
export function makeUserRegistrationController(){
  const userRegistrationValidation = new UserRegistrationValidation()
  const userRepository = new UserRepository()
  const emailService = new EmailService()
  const hashCrypt = new HashCrypt(12)
  const userRegistrationController = new UserRegistrationController(userRegistrationValidation, userRepository, userRepository, emailService, hashCrypt)
  return userRegistrationController  
}