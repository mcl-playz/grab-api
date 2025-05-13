const jsonify = (success, data, message) => {
    const response = {};
    if (data !== undefined && success === true) {
        response.data = data;
    }
    if (message !== undefined && success === false) {
        response.error = { message };
    }
    return response;
}

const error = (message) => {
    return jsonify(false, undefined, message);
}

const success = (data) => {
    return jsonify(true, data);
}

module.exports = { error, success }