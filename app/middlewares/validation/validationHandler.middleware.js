const validationResult = require('express-validator/check/validation-result');

const handleUserValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next({
            status: 400,
            errors: errors.array()
        });
    } else {
        next();
    }   
}

module.exports = handleUserValidationErrors;