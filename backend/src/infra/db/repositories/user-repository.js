import knex from '../helper/knex'
export class UserRepository {
  tableName = 'users'
  async loadByEmail(email){
    const user = await knex(this.tableName).where({ email }).select('*')
    return user[0]
  }
}