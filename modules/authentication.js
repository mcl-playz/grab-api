require('dotenv').config();
const jwtUtil = require("../utils/jwt")
const apiUtil = require("../utils/api")

const api = (req, res, next) => {
    const authHeader = req.headers.authorization; // Extract the token from the request

    // If the token doesn't exist, return an error
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json(apiUtil.error("No token provided"));
    }

    const token = authHeader.split(' ')[1]; // Trim everything but the token

    try {
        // Ensure that the token is valid & return
        const decoded = jwtUtil.verifyToken(token)
        req.user = decoded;
        next();
    } catch (err){ // An error is only thrown if the token is invalid or expired
        return res.status(403).json(apiUtil.error("Invalid or expired token"));
    }
};

module.exports = { api }