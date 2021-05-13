exports.up = function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(()=>{
    return knex.schema.createTable('user-address', function(table) {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('cep').notNullable();
      table.string('street').notNullable();
      table.string('complement');
      table.string('district').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('number');
      table.uuid('user_id').notNullable().index().references('id').inTable('users')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user-address');
};
