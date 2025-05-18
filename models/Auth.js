const bcrypt = require('bcryptjs');
const { db } = require('../modules/database');

const validatePassword = async (password, userID) => {
    // password - user supplied
    // hashedPassword - stored password

    const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [userID])
    const hashedPassword = rows[0].password;

    // Return a boolean (correct pass: true)
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { validatePassword }