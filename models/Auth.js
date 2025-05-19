const bcrypt = require('bcryptjs');
const { db } = require('../modules/database');

const validatePassword = async (password, userID) => {
    // Query the database to get the user's hashed password
    const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [userID])
    const hashedPassword = rows[0].password;

    // Return a boolean (correct password: true)
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { validatePassword }