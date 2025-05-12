const Auth = require('../models/Auth');
const User = require('../models/User');
const jwtUtil = require('../utils/jwt');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user || !(await Auth.validatePassword(password, user.id))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = await jwtUtil.generateToken(user);
        res.json({ success: true, user, token });

    } catch (err) {
        console.error('API login failed:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { login }