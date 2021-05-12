import { knex } from 'knex'
import knexConfig from '../../../main/config/knexfile'
import config from '../../../main/config/index'
const env = config.env
export default knex(knexConfig[env])