const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = async (user) => {
    return jwt.sign(
        { id: user.id, roles: await user.roles },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
