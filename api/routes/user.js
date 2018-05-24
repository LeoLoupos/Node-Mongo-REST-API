const express = require('express');
const router =  express.Router();

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');
const bodyValidation = require('../middleware/body-validation')


//Assure that the user email doesnt exist
router.post('/signup', bodyValidation.validateUser, UserController.user_signup );

router.post('/login', bodyValidation.validateUser, UserController.user_login );

router.delete('/:id', checkAuth, UserController.user_delete );

module.exports = router;