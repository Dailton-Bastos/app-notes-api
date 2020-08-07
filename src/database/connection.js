const knex = require('knex');
const configDB = require('../config/knexfile');

const db = knex(configDB.development);

module.exports = db;
