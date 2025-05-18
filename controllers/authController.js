const Auth = require('../models/Auth');
const User = require('../models/User');
const jwtUtil = require('../utils/jwt');
const apiUtil = require('../utils/api');

const login = async (req, res) => {
    const { email, password } = req.body; // Extract the data within the request

    try {
        const user = await User.getUserByEmail(email);

        // Return an error if the wrong credentials were entered
        if (!user || !(await Auth.validatePassword(password, user.id))) {
            return res.status(401).json(apiUtil.error("Invalid credentials"));
        }

        // Generate a token used to authenticate a client
        const token = await jwtUtil.generateToken(user);

        res.json(apiUtil.success({ user, token }));
    } catch (err) {
        console.error('API login failed:', err);
        res.status(500).json(apiUtil.error("Internal server error"));
    }
};

module.exports = { login }