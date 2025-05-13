const User = require('../models/User');
const apiUtil = require('../utils/api')

const getUserByEmail = async (req, res) => {
	const { email } = req.params;

	const user = await User.getUserByEmail(email);
	if(user === null){
		res.status(404).json(apiUtil.error("User not found"));
	}

	res.json(apiUtil.success({ user }));
};

module.exports = { getUserByEmail };