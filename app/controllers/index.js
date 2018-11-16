const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(expressValidator());

router.use('/person', require('./person.controller'));
router.use('/note', require('./note.controller'));
router.use('/image', require('./image.controller'));

module.exports = router;