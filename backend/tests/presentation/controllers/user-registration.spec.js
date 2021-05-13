import { UserRegistrationController } from '../../../src/presentation/controllers/user-registration'
import { badRequest, serverError, noContent } from '../../../src/presentation/http-protocol/http-response'
const makeFakeRequest = () => {
  return {
    body:{
      name:'any_name',
      email:'any@email',
      password:'any_password',
      confirm_password:'any_password',
      cpf:'any_cpf',
      cep:'any_cep',
      street:'any_street',
      complement:'any_complement',
      district:'any_district',
      city:'any_city',
      state:'any_state',
      number:'any_number'
    }
  } 
}
const makeFakeLoadUserByEmail = () =>{
  class FakeLoadUserByEmail {
    async loadByEmail(email){
      return await Promise.resolve(null)
    }
  }
  return new FakeLoadUserByEmail()
}
const makeFakeCreateUser = () =>{
  class FakeCreateUser {
    async register(userData){
      return await Promise.resolve(true)
    }
  }
  return new FakeCreateUser()
}
const makeFakeEmailSender = () =>{
  class SendNewUserEmail {
    async sendNewUserMessage(email){
      return await Promise.resolve(true)
    }
  }
  return new SendNewUserEmail()
}
const makeFakeEncrypt = () =>{
  class FakeEncrypt {
    async crypt(password){
      return 'any_hash'
    }
  }
  return new FakeEncrypt()
}
const makeFakeReigstrationValidation = () =>{
  class RegistrationValidation {
    async validate(payload) {
      return await Promise.resolve(null)
    }
  }
  return new RegistrationValidation()
}
const makeSut = () =>{
  const userRegistrationValidation = makeFakeReigstrationValidation()
  const loadUserByEmail = makeFakeLoadUserByEmail()
  const createUser = makeFakeCreateUser()
  const sendUserEmail = makeFakeEmailSender()
  const fakeEncrypt = makeFakeEncrypt()
  const sut = new UserRegistrationController(userRegistrationValidation, loadUserByEmail, createUser, sendUserEmail, fakeEncrypt)
  return {
    sut,
    loadUserByEmail,
    createUser,
    sendUserEmail,
    userRegistrationValidation,
    fakeEncrypt
  }
}

describe('User Registration Controller', () => {
  test("ensure user registration calls loadUserByEmail with request email", async ()=>{
    const { sut, loadUserByEmail } = makeSut()
    const loadSpy = jest.spyOn(loadUserByEmail, 'loadByEmail')
    await sut.handler(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any@email')
  })
  test("ensure user registration returns bad request if loadUserByEmail returns a value", async ()=>{
    const { sut, loadUserByEmail } = makeSut()
    jest.spyOn(loadUserByEmail, 'loadByEmail').mockResolvedValueOnce({email:'any@email', name:'any_name', cpf:'any_cpf'})
    const response = await sut.handler(makeFakeRequest())
    expect(response).toEqual(badRequest('Email já existe'))
  })
  test("ensure user registration returns server error if loadUserByEmail throws", async ()=>{
    const { sut, loadUserByEmail } = makeSut()
    jest.spyOn(loadUserByEmail, 'loadByEmail').mockRejectedValueOnce(new Error())
    const response = await sut.handler(makeFakeRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test("ensure user registration calls createUser with request data", async ()=>{
    const { sut, createUser } = makeSut()
    const request = makeFakeRequest()
    const registerSpy = jest.spyOn(createUser, 'register')
    await sut.handler(request)
    delete request.body.confirm_password
    expect(registerSpy).toHaveBeenCalledWith(request.body)
  })
  test("ensure user registration returns server error if createUser throws", async ()=>{
    const { sut, createUser } = makeSut()
    jest.spyOn(createUser, 'register').mockRejectedValueOnce(new Error())
    const response = await sut.handler(makeFakeRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test("ensure user registration calls sendNewEmailRegister with new user email", async ()=>{
    const { sut, sendUserEmail } = makeSut()
    const request = makeFakeRequest()
    const sendEmailSpy = jest.spyOn(sendUserEmail, 'sendNewUserMessage')
    await sut.handler(request)
    expect(sendEmailSpy).toHaveBeenCalledWith(request.body.email)
  })
  test("ensure user registration calls sendNewEmailRegister with new user email only if register returns true", async ()=>{
    const { sut, sendUserEmail,createUser } = makeSut()
    const request = makeFakeRequest()
    const sendEmailSpy = jest.spyOn(sendUserEmail, 'sendNewUserMessage')
    jest.spyOn(createUser, 'register').mockResolvedValueOnce(false)
    await sut.handler(request)
    expect(sendEmailSpy).not.toHaveBeenCalled()
  })
  test("ensure user registration calls userRegistrationValidation with request body", async ()=>{
    const { sut, userRegistrationValidation } = makeSut()
    const validateSpy = jest.spyOn(userRegistrationValidation, 'validate')
    const request = makeFakeRequest()
    await sut.handler(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })
  test("ensure user registration returns bad request if userRegistrationValidation returns an error", async ()=>{
    const { sut, userRegistrationValidation } = makeSut()
    jest.spyOn(userRegistrationValidation, 'validate').mockResolvedValueOnce(new Error('Invalid password'))
    const request = makeFakeRequest()
    const response = await sut.handler(request)
    expect(response).toEqual(badRequest(new Error('Invalid password')))
  })
  test("ensure user registration returns noContent on succeeds", async ()=>{
    const { sut } = makeSut()
    const request = makeFakeRequest()
    const response = await sut.handler(request)
    expect(response).toEqual(noContent())
  })
  test("ensure user registration calls encrypt with request password", async ()=>{
    const { sut, fakeEncrypt } = makeSut()
    const fakeEncryptSpy = jest.spyOn(fakeEncrypt, 'crypt')
    const request = makeFakeRequest()
    await sut.handler(request)
    expect(fakeEncryptSpy).toHaveBeenCalledWith('any_password')
  })
})
