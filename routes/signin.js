const express = require('express');
const router = express.Router();

const signinController = require('../controllers/signin_controller');

router.get('/signin', signinController.signin);

module.exports = router;