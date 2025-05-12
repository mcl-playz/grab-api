const { db } = require('../modules/database');

const getUserByEmail = async (email) => {
	const userQuery = "SELECT id, email, first_name, last_name FROM users WHERE email = ?";
	const rolesQuery = "SELECT r.id AS roles FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.email = ?"

	try {
		const [user] = await db.query(userQuery, [email]);
		const [roles] = await db.query(rolesQuery, [email]);
		const rolesArray = roles.map(item => item.roles);
		user[0].roles = rolesArray;
		return user[0];
	} catch (err) {
		throw err;
	}
};

module.exports = { getUserByEmail };