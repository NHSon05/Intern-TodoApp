const express = require('express')
const { getUser } = require('../controllers/user.controller')
const {verifyToken} = require('../middlewares/auth.middleware')

const router = express.Router();

router.get('/', verifyToken , getUser);

module.exports = router;