require('dotenv').config();
const jwtUtil = require("../utils/jwt")
const apiUtil = require("../utils/api")

const api = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json(apiUtil.error("No token provided"));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwtUtil.verifyToken(token)
        req.user = decoded;
        next();
    } catch (err){
        return res.status(403).json(apiUtil.error("Invalid or expired token"));
    }
};

module.exports = { api }