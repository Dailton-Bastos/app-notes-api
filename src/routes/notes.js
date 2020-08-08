const { Router } = require('express');

const routes = new Router();

const NoteController = require('../app/controllers/NoteController');

const { post } = require('../app/validators/note');

const authMiddleware = require('../app/middlewares/auth');

routes.use(authMiddleware);

routes.get('/:id', NoteController.show);
routes.post('/', post, NoteController.create);

module.exports = routes;
