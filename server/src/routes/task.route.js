const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, (req, res) => res.send("You have presented the correct Token, allowing you to retrieve the Task list!"));
router.post('/', verifyToken, (req, res) => res.send("You have presented the correct Token, allowing you to create Task!"));

module.exports = router;