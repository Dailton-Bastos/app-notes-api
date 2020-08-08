const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

module.exports = {
  create(req, res) {
    const { id, name, email } = req.user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
