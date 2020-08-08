const { Router } = require('express');

const routes = new Router();

const NoteController = require('../app/controllers/NoteController');

const { post, update } = require('../app/validators/note');

const authMiddleware = require('../app/middlewares/auth');

routes.use(authMiddleware);

routes
  .get('/', NoteController.index)
  .get('/:id', NoteController.show)
  .post('/', post, NoteController.create)
  .put('/:id', update, NoteController.update)
  .delete('/:id', NoteController.destroy);

module.exports = routes;
