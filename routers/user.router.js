const router = require('express').Router()
const userController = require('../controllers/user.controller')
const UserController = require ('../controllers/user.controller')
router.post('/login',userController.login)

module.exports=router