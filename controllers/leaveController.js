const Leave = require('../models/Leave');
const apiUtil = require('../utils/api')

const getLeaveByID = async (req, res) => {
    const { id } = req.params; // Extract the data within the request

    const leave = await Leave.getLeaveByID(id);

    // Return an error if the leave could not be found
    if(leave === null){
        res.status(404).json(apiUtil.error("Leave not found"));
    } 

    res.json(apiUtil.success({ leave }));
};

const createLeave = async (req, res) => {
    
}

module.exports = { getLeaveByID };