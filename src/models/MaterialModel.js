const dbPool = require("../config/database");

const getAllMaterials = async (class_id="") => {
    const where = (class_id !== "") ? `WHERE materials.class_id = ${class_id}` : "";
    const [rows] = await dbPool.execute(`SELECT * FROM materials ${where}`);
    return rows;
};

const getMaterial = async (id) => {
    const [rows] = await dbPool.execute(`SELECT * FROM materials WHERE materials.id = ${id}`);
    return (rows.length > 0) ? rows[0] : false;
};

module.exports = { getMaterial, getAllMaterials };