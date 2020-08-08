const { Router } = require('express');

const routes = new Router();

const SessionController = require('../app/controllers/SessionController');

const { post } = require('../app/validators/session');

routes.post('/session', post, SessionController.create);

const users = require('./users');

routes.use('/users', users);

module.exports = routes;
