const Auth = require('../models/Auth');
const User = require('../models/User');
const jwtUtil = require('../utils/jwt');
const apiUtil = require('../utils/api');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user || !(await Auth.validatePassword(password, user.id))) {
            return res.status(401).json(apiUtil.error("Invalid credentials"));
        }

        const token = await jwtUtil.generateToken(user);
        res.json(apiUtil.success({ user, token }));

    } catch (err) {
        console.error('API login failed:', err);
        res.status(500).json(apiUtil.error("Internal server error"));
    }
};

module.exports = { login }