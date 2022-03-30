const express = require('express');
const UserController = require('./controllers/UserController');
const TimerController = require('./controllers/TimerController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.get('/', (req, res) => {
    return res.json({message: "Hello World"});
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/timers', TimerController.index);
routes.post('/timers', TimerController.create);
routes.put('/timers/:id', TimerController.update);
routes.delete('/timers/:id', TimerController.delete);

routes.post('/sessions', SessionController.create);


module.exports = routes;