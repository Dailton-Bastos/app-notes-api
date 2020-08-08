const { Router } = require('express');

const routes = new Router();

const users = require('./users');

routes.use('/users', users);

module.exports = routes;
