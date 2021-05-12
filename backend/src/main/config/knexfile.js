// Update with your config settings.

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
      password: ''
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
      database: 'user-register',
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
  }

};
