const { body } = require('express-validator/check');

const createPerson = [
    body('username', 'No username provided').exists(),
    body('email', 'Invalid email').exists().isEmail().withMessage('no valid email provided'),
    body('firstName', 'No first name provided').exists(),
    body('lastName', 'No last name provided').exists(),
    body('password', 'No password provided').exists(),
    body('confirmPassword')
        .exists().withMessage('No confirmation password provided')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
];
const login = [
    body('email', 'Invalid email').exists().isEmail().withMessage('no valid email provided'),
    body('password', 'No password provided').exists()
];


module.exports = { createPerson, login };