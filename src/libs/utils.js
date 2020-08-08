const { compare } = require('bcryptjs');

module.exports = {
  checkPassword(password, password_hash) {
    return compare(password, password_hash);
  },

  isOwnerNote(user, note) {
    const userId = JSON.stringify(user);
    const noteUserId = JSON.stringify(note.user_id);

    return userId === noteUserId;
  },
};
