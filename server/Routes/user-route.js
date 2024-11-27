const express = require('express');
const router =  express.Router();
const userController = require('../Controllers/user-controller')

router.post('/signUp',userController.signUp)
router.post('/logIn',userController.signIn)
router.post('/logOut',userController.logOut)

module.exports = router