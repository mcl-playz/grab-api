const { db } = require('../modules/database');

const getUserByEmail = async (email) => {
	const userQuery = "SELECT id, email, first_name, last_name FROM users WHERE email = ?";
	const rolesQuery = "SELECT r.id AS roles FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.email = ?";

	try {
		// Get information about the user
		const [userResult] = await db.query(userQuery, [email]);
		const user = userResult[0];

		// Return null if the user doesn't exist
		if(!user){
    		return null;
  		}

		// Set the user's roles & then return the user object
		const [rolesResult] = await db.query(rolesQuery, [email]);
    	const roles = rolesResult.map(item => item.roles); // Convert the result into an array
    	user.roles = roles; // Insert the roles into the user object
		return user;
	} catch (err) {
		throw err;
	}
};

module.exports = { getUserByEmail };