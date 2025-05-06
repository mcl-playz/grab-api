const { promisePool } = require('../modules/database');

const getUserByEmail = async (email) => {
	const query = "SELECT id, first_name, last_name FROM users WHERE email = ?";

	try {
		const [rows] = await promisePool.query(query, [email]);
		return rows[0];
	} catch (err) {
		throw err;
	}
};

const getRolesByID = async (id) => {
	const query = "SELECT r.name AS roles FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.id = ?";

	try {
		const [rows] = await promisePool.query(query, [id]);
		return rows;
	} catch (err){
		throw err;
	}
}

module.exports = { getUserByEmail, getRolesByID };