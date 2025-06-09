//  creating route for user
const router = require('express').Router();
const { signup,login } = require('../Controllers/AuthController');
const {SignUpValidation,loginValidation} = require('../Middlewares/AuthValidation')

// creating endpoint

router.post('/login',loginValidation,login)
router.post('/signup',SignUpValidation,signup)


module.exports = router;
