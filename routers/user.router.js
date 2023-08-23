const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('/login',userController.login)
router.post('/sign-up',userController.signUp)
// router.get('/',userController,getUser)
module.exports=router