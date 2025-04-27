const dbPool = require("../config/database");

const getAllModules = async (class_id="") => {
    const where = (class_id !== "") ? `WHERE modules.class_id = ${class_id}` : "";
    const [rows] = await dbPool.execute(`SELECT * FROM modules ${where}`);
    return rows;
};

module.exports = { getAllModules };