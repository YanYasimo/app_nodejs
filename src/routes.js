const express = require('express');
const UserController = require('./controllers/UserController');
const TimerController = require('./controllers/TimerController');

const middleware = require('./middlewares/authentication');

const routes = express.Router();

routes.get('/users', UserController.list);
routes.post('/users', UserController.create);

routes.get('/timers', TimerController.index);
routes.post('/timers', TimerController.create);
routes.put('/timers/:id', TimerController.update);
routes.delete('/timers/:id', TimerController.delete);

routes.post('/login', middleware.local, UserController.login);

module.exports = routes;