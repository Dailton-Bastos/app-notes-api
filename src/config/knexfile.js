const { resolve } = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
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
