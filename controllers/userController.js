const User = require('../models/User');
const apiUtil = require('../utils/api')

const getUserByEmail = async (req, res) => {
	const { email } = req.params; // Extract the data within the request

	const user = await User.getUserByEmail(email);

	// Return an error if the user could not be found
	if(user === null){
		res.status(404).json(apiUtil.error("User not found"));
	}

	res.json(apiUtil.success({ user }));
};

module.exports = { getUserByEmail };