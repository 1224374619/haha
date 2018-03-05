const express = require('express');
const router = express.Router();
const user = require("../controllers/user")

/* GET users listing. */
router.get('/login', user.login);
router.post('/login', user.doLogin);

module.exports = router;
