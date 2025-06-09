// --- Import Core Modules ---
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const leaveController = require('../controllers/leaveController');
const auth = require("../modules/authentication")

// --- API Routes ---
// http://localhost:3001/api/{route}
router.get('/user/:email', auth.api, userController.getUserByEmail);
router.post("/login", authController.login)
router.get('/leave/:id', auth.api, leaveController.getLeaveByID)

module.exports = router;