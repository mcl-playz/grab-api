const { db } = require('../modules/database');

const getLeaveByID = async (id) => {
	const leaveQuery = "SELECT * FROM users WHERE email = ?";

	try {
		// Get information about the user
		const [leaveResult] = await db.query(leaveQuery, [id]);
		const leave = leaveResult[0];

		// Return null if the leave doesn't exist
		if(!leave){
    		return null;
  		}

		return user;
	} catch (err) {
		throw err;
	}
};

const createLeave = async (hostID, leaveTypeID, departureDate, returnDate, departureTransportID, returnTransportID, destination, notes) => {
    const leaveQuery = "INSERT INTO leaves (status, host_id, leave_type_id, departure_date, return_date, departure_transport_id, return_transport_id, destination, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    
    try {
        const [createResult] = await db.query(leaveQuery, ["PENDING", hostID, leaveTypeID, departureDate, returnDate, departureTransportID, returnTransportID, destination, notes])
    } catch (err) {
        throw err;
    }
};

module.exports = { getLeaveByID, createLeave };