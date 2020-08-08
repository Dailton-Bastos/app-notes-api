const { addFakerNotes } = require('../../libs/utils');

exports.seed = (knex) => {
  const notes = addFakerNotes();

  return knex('notes')
    .del()
    .then(() => {
      return knex('notes').insert(notes);
    });
};
