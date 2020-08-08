const { compare, hash } = require('bcryptjs');

const faker = require('faker');

faker.locale = 'pt_BR';

module.exports = {
  checkPassword(password, password_hash) {
    return compare(password, password_hash);
  },

  isOwnerNote(user, note) {
    const userId = JSON.stringify(user);
    const noteUserId = JSON.stringify(note.user_id);

    return userId === noteUserId;
  },

  async addFakerUsers() {
    const users = [];

    const password_hash = await hash('123456'.toString(), 8);

    for (let i = 0; i < 5; i += 1) {
      const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: password_hash,
      };

      users.push(user);
    }

    return users;
  },
};
