const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const auth = require("../modules/authentication")

// Route to get user profile by email
router.get('/user/:email', auth.api, userController.getUserData);
router.post("/login", authController.login)

module.exports = router;