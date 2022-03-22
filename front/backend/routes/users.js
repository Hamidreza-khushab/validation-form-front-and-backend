const express = require('express');
const router = express.Router();
const { addUser, loginUser }  = require('../controllers/usersController.js');
const userValidationPostRules = require('../validation/userValidation.js');
router
    .route('/registration')
    .post(userValidationPostRules, addUser);
router
    .route('/login')
    .post(loginUser);
// router
//     .route('/logout')
//     .post(logoutUser);

module.exports = router;
