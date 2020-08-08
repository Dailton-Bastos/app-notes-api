const db = require('../../database/connection');

module.exports = {
  async index(req, res, next) {
    const { filter, page = 1 } = req.query;

    const user_id = req.userId;

    try {
      const notes = await db('notes')
        .where({ user_id })
        .andWhere('notes.title', 'ilike', `%${filter}%`)
        .orderBy('notes.updated_at', 'desc')
        .limit(5)
        .offset((page - 1) * 5);

      if (!notes[0]) {
        return res.status(404).json({
          error: 'Notes not found!',
        });
      }

      return res.status(202).json(notes);
    } catch (error) {
      return next(error);
    }
  },
};
