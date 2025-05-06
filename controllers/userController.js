const User = require('../models/User');

const getUserData = async (req, res) => {
  const { email } = req.params;

	try {
		const user = await User.getUserByEmail(email);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { getUserData };