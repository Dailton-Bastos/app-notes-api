const { resolve } = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'notes',
      user: 'postgres',
      password: 'docker',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, '..', 'database', 'migrations'),
    },
    seeds: {
      directory: resolve(__dirname, '..', 'database', 'seeds'),
    },
  },
};
