import { UserRepository } from '../../../src/infra/db/repositories/user-repository'
import knex from '../../../src/infra/db/helper/knex'
const makeUser = () =>{
  return {
    name:'any_name',
    password:'any_password',
    email:'any@email',
    cpf:'any_cpf'
  }
}
const makeAddress = () =>{
  return {
    cep:'any_cep',
    street:'any_street',
    complement:'any_complement',
    district:'any_district',
    city:'any_city',
    state:'any_state',
    number:'any_number'
  }
}
const insertPayload = async()=>{
  const newUser = await knex('users').insert(makeUser()).returning('id')
  const address = makeAddress()
  address.user_id = newUser[0]
  await knex('user-address').insert(address)
}
describe("User Repository", ()=>{
  beforeAll(async () => {
    await knex.migrate.latest()
  })
  afterAll(async () => {
    await knex.migrate.down()
  })
  beforeEach(async () => {
    await knex('user-address').del()
    await knex('users').del()
  })
  const makeSut = () => {
    return new UserRepository()
  }
  test('Ensure UserRepository loadUserByEmail with a existent email',async()=>{
    const sut = makeSut()   
    await insertPayload()
    const res = await sut.loadByEmail('any@email')
    expect(res).toBeTruthy()
  })
  test('Ensure UserRepository insert a new user on database',async()=>{
    const sut = makeSut()   
    const userData = makeUser()
    const address = makeAddress()
    await sut.register({...userData, ...address})
    const user = await knex('users').where({email: 'any@email'}).select()
    expect(user[0].email).toBe('any@email')
  })
  test('Ensure UserRepository calls registerUserAddress on insert new user',async()=>{
    const sut = makeSut()   
    const userData = makeUser()
    const address = makeAddress()
    await sut.register({...userData, ...address})
    const user = await knex('users').where({email: 'any@email'}).select()
    const userAddress = await knex('user-address').where({user_id: user[0].id}).select()
    expect(userAddress[0]).toBeTruthy()
  })
})