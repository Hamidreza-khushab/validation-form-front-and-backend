const { body } = require('express-validator');

const userValidationPostRules = 
[
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email...'),
    body('password')
        .isLength({ min: 5 })
        .withMessage(' Minimum password length is 5 '),
    body('firstName')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Please enter your first name.'),
    body('lastName')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Please enter your last name.')
];
module.exports = userValidationPostRules;
