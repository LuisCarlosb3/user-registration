import { UserRegistrationValidation } from '../../src/validation/user-registration-validation'
const makeSut = () =>{
  return new UserRegistrationValidation()
}
const makeFakeUserInfo = () =>{
  return {
    name:'any_name',
    email:'any@email.com',
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
describe('User Registration Validation', ()=>{
  test('Ensure UserRegistration Validation returns null on validation succeeds', async ()=>{
    const sut = makeSut()
    const validationResponse = await sut.validate(makeFakeUserInfo())
    expect(validationResponse).toBeNull()
  })
  test('Ensure UserRegistration Validation returns an error on validation', async ()=>{
    const sut = makeSut()
    const userInfo =  makeFakeUserInfo()
    delete userInfo.name
    const validationResponse = await sut.validate(userInfo)
    expect(validationResponse).toEqual(["Nome é obrigatório"])
  })
})