const route = require('express').Router()
const {getNewAccesstoken, logout} = require('../controller/refreshToken')

route.post('/', getNewAccesstoken)
route.delete('/', logout)

module.exports = route;