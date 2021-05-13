import request from 'supertest'
import server from '../../src/main/config/app'
import knex from '../../src/infra/db/helper/knex'
import env from '../../src/main/config/index'
const makeFakeUserData =() =>{
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
describe('User router',()=>{
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
  test('Should return 204 on create user', async () => {
    await request(server).post('/register').send(makeFakeUserData()).expect(204)
  })
  test('Should return 400 on invalid email', async () => {
    const {email, ...userData} = makeFakeUserData()
    await request(server).post('/register').send(userData).expect(400)
  })
})