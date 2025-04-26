const dbPool = require("../config/database");

const getAllUsers = () => {
    const rows = dbPool.execute("SELECT * FROM users");
    return rows;
};

module.exports = { getAllUsers };