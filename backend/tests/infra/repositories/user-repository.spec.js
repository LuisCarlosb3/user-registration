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
describe("User Repository", ()=>{
  beforeAll(async () => {
    await knex.migrate.latest()
  })
  afterAll(async () => {
    await knex.migrate.down()
  })
  beforeEach(async () => {
    await knex('users').del()
  })
  const makeSut = () => {
    return new UserRepository()
  }
  test('Ensure UserRepository loadUserByEmail with a existent email',async()=>{
    const sut = makeSut()
    const data = makeUser()
    await knex('users').insert(data)
    const res = await sut.loadByEmail('any@email')
    expect(res).toBeTruthy()
  })
})