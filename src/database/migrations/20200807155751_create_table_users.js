const { onUpdateTrigger } = require('../../libs/utils');

exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();

      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger('users')));
};

exports.down = (knex) => knex.schema.dropTable('users');
