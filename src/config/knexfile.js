const { resolve } = require('path');

require('dotenv').config({ path: resolve(__dirname, '..', '..', '.env') });

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
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
