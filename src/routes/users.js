const { Router } = require('express');

const routes = new Router();

const UserController = require('../app/controllers/UserController');

const { post } = require('../app/validators/user');

routes.post('/register', post, UserController.create);

module.exports = routes;
