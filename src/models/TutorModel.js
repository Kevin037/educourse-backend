const dbPool = require("../config/database");

const getAllTutors = async (class_id="") => {
    const where = (class_id !== "") ? `WHERE tutors.class_id = ${class_id}` : "";
    const [rows] = await dbPool.execute(`SELECT * FROM tutors ${where}`);
    return rows;
};

module.exports = { getAllTutors };