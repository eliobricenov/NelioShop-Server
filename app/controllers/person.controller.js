const express = require('express');
const router = express.Router();

const personService = require('../services/person.service');
const personValidation = require('../middlewares/validation/person/personValidation.middleware');
const handleValidationErrors = require('../middlewares/validation/validationHandler.middleware');
const jwt = require('../middlewares/jwt/jwt');
const config = require('../util/configuration');

router
    //start of endpoints

    .post('/', [personValidation.createPerson, handleValidationErrors], async (req, res, next) => {
        try {
            const data = await personService.create(req.body);
            res.status(200).send({
                status: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    })

    .post('/login', [personValidation.login, handleValidationErrors], async (req, res, next) => {
        try {
            const data = await personService.login(req.body);
            const token = await jwt.generateToken(data, config.secretKey);
            res.status(200).send({
                status: 200,
                data,
                token
            });
        } catch (error) {
            next(error);
        }
    });

module.exports = router;