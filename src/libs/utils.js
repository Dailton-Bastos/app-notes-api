const { compare } = require('bcryptjs');

module.exports = {
  checkPassword(password, password_hash) {
    return compare(password, password_hash);
  },
};
