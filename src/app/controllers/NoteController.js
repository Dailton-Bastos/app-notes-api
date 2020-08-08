const db = require('../../database/connection');

const { isOwnerNote } = require('../../libs/utils');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const user_id = req.userId;

    try {
      const notes = await db('notes')
        .select('notes.*')
        .where({ user_id })
        .orderBy('notes.created_at', 'desc')
        .limit(5)
        .offset((page - 1) * 5);

      return res.json(notes);
    } catch (error) {
      return res.status(500).json({
        error: 'Unexpected error to get notes list!',
      });
    }
  },

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

  async update(req, res) {
    const { id } = req.params;

    const { title, body } = req.body;

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

      if (title || body) {
        await db('notes').where({ id }).update({
          title,
          body,
        });
      }

      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({
        error: 'Unexpected error while updating the note!',
      });
    }
  },
};
