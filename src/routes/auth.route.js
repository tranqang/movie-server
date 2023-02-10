const express=require('express')

const router=express.Router()
const authController=require('../controllers/auth.controller')
const { checkLogin } = require('../middlewares/auth.middleware')
router.post('/login',authController.login)
router.post('/register',authController.register)
router.get('/information',checkLogin,authController.getMyInformation)
router.put('/information',checkLogin,authController.updateMyInformation)
router.get('/myTickets',checkLogin,authController.getMyTickets)


module.exports=router