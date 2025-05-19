const jwt = require('jsonwebtoken');

// Generates an authentication token
const generateToken = async (user) => {
    return jwt.sign(
        { id: user.id, roles: await user.roles }, // Encodes the user's ID and roles within the token
        process.env.JWT_SECRET, // Signs using the secret so tokens can't be faked
        { expiresIn: '1h' } // Token will become unusable after 1 hour
    );
};

// Ensures that the token is valid
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET); // Checks the provided token against the secret to ensure its real
};

module.exports = { generateToken, verifyToken };
