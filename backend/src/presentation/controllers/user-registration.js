import { badRequest, serverError, noContent } from "../http-protocol/http-response"

export class UserRegistrationController {
  constructor(userRegistrationValidation, loadUserByEmail, createUser, sendNewUserEmail){
    this.userRegistrationValidation = userRegistrationValidation
    this.loadUserByEmail = loadUserByEmail
    this.createUser = createUser
    this.sendNewUserEmail = sendNewUserEmail
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
      delete body.password_confirmation
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
