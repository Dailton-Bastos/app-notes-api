const { addFakerUsers } = require('../../libs/utils');

exports.seed = async (knex) => {
  const users = await addFakerUsers();

  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert(users);
    });
};
