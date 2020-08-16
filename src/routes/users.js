const { Router } = require('express');

const routes = new Router();

const UserController = require('../app/controllers/UserController');

const authMiddleware = require('../app/middlewares/auth');

const { post, update } = require('../app/validators/user');

routes
  .post('/register', post, UserController.create)
  .put('/', authMiddleware, update, UserController.update)
  .delete('/', authMiddleware, UserController.destroy);

module.exports = routes;
