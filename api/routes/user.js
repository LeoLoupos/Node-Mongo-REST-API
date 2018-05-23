const express = require('express');
const router =  express.Router();

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');


//Assure that the user email doesnt exist
router.post('/signup', UserController.user_signup );

router.post('/login', UserController.user_login );

router.delete('/:id', checkAuth, UserController.user_delete );

module.exports = router;