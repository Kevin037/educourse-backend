const dbPool = require("../config/database");

const getAllPretests = async (class_id="") => {
    const where = (class_id !== "") ? `WHERE pretests.class_id = ${class_id}` : "";
    const [rows] = await dbPool.execute(`SELECT * FROM pretests ${where}`);
    return rows;
};

const getPretest = async (id) => {
    const [rows] = await dbPool.execute(`SELECT * FROM pretests WHERE pretests.id = ${id}`);
    return (rows.length > 0) ? rows[0] : false;
};

module.exports = { getPretest,getAllPretests };