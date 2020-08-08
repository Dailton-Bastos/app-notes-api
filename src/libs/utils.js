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

  addFakerNotes() {
    const notes = [];

    for (let i = 0; i < 20; i += 1) {
      const note = {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        user_id: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
      };

      notes.push(note);
    }

    return notes;
  },

  onUpdateTrigger(table) {
    return `
      CREATE TRIGGER ${table}_updated_at
      BEFORE UPDATE ON ${table}
      FOR EACH ROW
      EXECUTE PROCEDURE on_update_timestamp();
    `;
  },
};
