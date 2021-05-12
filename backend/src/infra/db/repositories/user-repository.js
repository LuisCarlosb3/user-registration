import knex from '../helper/knex'
import { UserAddressRepository } from './users-address-repository'
export class UserRepository {
  constructor(){
    this.addressRepository = new UserAddressRepository()
  }
  tableName = 'users'
  async loadByEmail(email){
    const user = await knex(this.tableName).leftJoin('user-address','users.id','user-address.user_id')
    return user[0]
  }
  async register(userInfo){
    const { name, password, email, cpf, ...address} = userInfo
    const newUserId = await knex(this.tableName).insert({ name, password, email, cpf }).returning('id')
    const userAddress = { user_id:newUserId[0], ...address }
    await this.addressRepository.registerUserAddress(userAddress)
  }
}