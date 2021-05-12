import knex from '../helper/knex'

export class UserAddressRepository {
  tableName = 'user-address'
  async registerUserAddress(address){
    await knex(this.tableName).insert(address)
  }
}