const db = require('../../database/connection');

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
};
