// Update with your config settings.
import env from './index'
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host : '127.0.0.1',
      database: 'user-register-dev',
      user:     'postgres',
      password: 'root'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/infra/db/helper/migrations'
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'user-register-test',
      user:     'postgres',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/infra/db/helper/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: env.db_name,
      user:     env.db_user,
      password: env.db_password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/infra/db/helper/migrations'
    }
  }

};
