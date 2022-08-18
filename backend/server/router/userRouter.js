const route = require('express').Router()
const {registration, login} = require('../controller/userController')

route.post('/', registration);
route.post('/login', login);

module.exports = route;