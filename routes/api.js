const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const auth = require("../modules/authentication")

router.get('/user/:email', auth.api, userController.getUserByEmail);
router.post("/login", authController.login)

module.exports = router;