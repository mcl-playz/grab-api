const Auth = require('../models/Auth');
const User = require('../models/User');
const jwtUtil = require('../utils/jwt');

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(401).render('pages/login', { error: 'Invalid email' });
        }

        const passIsValid = await Auth.validatePassword(password)
        if (!passIsValid) {
            return res.stat=us(401).render('pages/login', { error: 'Invalid password' });
        }

        req.session.user = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            roles: await User.getRolesByID(user.id)
        };

        res.redirect('/dashboard');

    } catch (err) {
        console.error('Authentication error:', err);
        res.status(500).send('Internal server error');
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.error(err);
        res.redirect('/login');
    });
};

const apiLogin = async (req, res) => {
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

module.exports = { login, logout, apiLogin }