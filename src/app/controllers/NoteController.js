const db = require('../../database/connection');

const { isOwnerNote } = require('../../libs/utils');

module.exports = {
  async create(req, res) {
    const { title, body } = req.body;

    try {
      const user_id = req.userId;

      const trx = await db.transaction();

      await trx('notes').insert({
        title,
        body,
        user_id,
      });

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({
        error: 'Unexpected error while creating new note!',
      });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    try {
      const results = await db('notes').where({ id });

      const note = results[0];

      if (!note) {
        return res.status(400).json({
          error: 'Note not found!',
        });
      }

      if (!isOwnerNote(req.userId, note)) {
        return res.status(403).json({
          error: 'Permission denied!',
        });
      }

      return res.json(note);
    } catch (error) {
      return res.status(500).json({
        error: 'Unexpected error while get the note!',
      });
    }
  },
};
