const { onUpdateTrigger } = require('../../libs/utils');

exports.up = (knex) => {
  return knex.schema
    .createTable('notes', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('body').notNullable();

      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger('notes')));
};

exports.down = (knex) => knex.schema.dropTable('notes');
