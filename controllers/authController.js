const Auth = require('../models/Auth');
const User = require('../models/User');
const jwtUtil = require('../utils/jwt');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user || !(await Auth.validatePassword(password, user.id))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = await jwtUtil.generateToken(user);
        res.json({ token });

    } catch (err) {
        console.error('API login failed:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { login }