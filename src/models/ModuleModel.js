const dbPool = require("../config/database");

const getAllModules = async (class_id="") => {
    const where = (class_id !== "") ? `WHERE modules.class_id = ${class_id}` : "";
    const [rows] = await dbPool.execute(`SELECT * FROM modules ${where}`);
    return rows;
};

const getModule = async (id) => {
    const [rows] = await dbPool.execute(`SELECT * FROM modules WHERE modules.id = ${id}`);
    return (rows.length > 0) ? rows[0] : false;
};

module.exports = { getAllModules, getModule };