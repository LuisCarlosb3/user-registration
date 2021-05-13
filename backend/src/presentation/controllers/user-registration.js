import { badRequest, serverError, noContent } from "../http-protocol/http-response"

export class UserRegistrationController {
  constructor(userRegistrationValidation, loadUserByEmail, createUser, sendNewUserEmail, encrypt){
    this.userRegistrationValidation = userRegistrationValidation
    this.loadUserByEmail = loadUserByEmail
    this.createUser = createUser
    this.sendNewUserEmail = sendNewUserEmail
    this.encrypt = encrypt
  }
  async handler (httpRequest) {
    try{ 
      const { body } = httpRequest
      const validationResponse = this.userRegistrationValidation.validate(body)
      if(validationResponse){
        return badRequest(validationResponse)
      }
      const emailExists = await this.loadUserByEmail.loadByEmail(body.email)
      if(emailExists){
        return badRequest('Email já existe')
      }
      const cryptPassword = await this.encrypt.crypt(body.password)
      body.password = cryptPassword
      delete body.confirm_password
      const userCreated = await this.createUser.register(body)
      if(userCreated){
        await this.sendNewUserEmail.send(body.email)
      }
      return noContent()
    }catch(error){
      return serverError(error)
    }
  }
}
