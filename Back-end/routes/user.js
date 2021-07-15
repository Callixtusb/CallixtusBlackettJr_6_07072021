const express = require('express');
const router = express.Router();
const userCtrl = require('../controlleurs/user');
const pwdValidator = require('../middleware/password');

router.post('/signup', pwdValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;