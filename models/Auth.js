const bcrypt = require('bcryptjs');
const { promisePool } = require('../modules/database');

const validatePassword = async (password, userID) => {
    const [rows] = await promisePool.query("SELECT password FROM users WHERE id = ?", [userID])
    const hashedPassword = rows[0].password;
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { validatePassword }