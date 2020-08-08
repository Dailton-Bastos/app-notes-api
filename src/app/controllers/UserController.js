const bcrypt = require('bcryptjs');
const db = require('../../database/connection');

module.exports = {
  async create(req, res, next) {
    const { name, email, password } = req.body;

    try {
      const password_hash = await bcrypt.hash(password.toString(), 8);

      const trx = await db.transaction();

      await trx('users').insert({
        name,
        email,
        password: password_hash,
      });

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      return next(error);
    }
  },
};
