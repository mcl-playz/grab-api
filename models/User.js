const { db } = require('../modules/database');

const getUserByEmail = async (email) => {
	const userQuery = "SELECT id, email, first_name, last_name FROM users WHERE email = ?";
	const rolesQuery = "SELECT r.id AS roles FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.email = ?"

	try {
		const [userResult] = await db.query(userQuery, [email]);
		const user = userResult[0]
		if (user) {
    		const [rolesResult] = await db.query(rolesQuery, [email]);
    		const rolesArray = rolesResult.map(item => item.roles);
    		user.roles = rolesArray;
    		return user;
  		}
		return null;
	} catch (err) {
		throw err;
	}
};

module.exports = { getUserByEmail };