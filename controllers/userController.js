const User = require('../models/User');

const getUserByEmail = async (req, res) => {
	const { email } = req.params;

	const user = await User.getUserByEmail(email);
	if(Object.keys(user).length === 0 || user === null){
		res.status(404).json({ success: false, message: "User not found" });
	}

	res.json({ data: { user } });
};

module.exports = { getUserByEmail };