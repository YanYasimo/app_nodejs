const express = require('express');
const UserController = require('./controllers/UserController');
const TimerController = require('./controllers/TimerController');
const middleware = require('./middlewares/authentication');

const routes = express.Router();

routes.get('/users',    UserController.list);
routes.post('/users',   UserController.create);

routes.get('/timers',           middleware.bearer, TimerController.index);
routes.post('/timers',          middleware.bearer, TimerController.create);
routes.put('/timers/:id',       middleware.bearer, TimerController.update);
routes.delete('/timers/:id',    middleware.bearer, TimerController.delete);

routes.post('/login',   middleware.local, UserController.login);

module.exports = routes;