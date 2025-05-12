const bcrypt = require('bcryptjs');
const { db } = require('../modules/database');

const validatePassword = async (password, userID) => {
    const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [userID])
    const hashedPassword = rows[0].password;
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { validatePassword }