const dbPool = require("../config/database");

const getAllClasses = async (category_id="") => {
    const where = (category_id !== "") ? `WHERE classes.category_id = ${category_id}` : "";
    const [rows] = await dbPool.execute(`SELECT classes.*, class_categories.name as category
                        , tutors.name as tutor, tutors.company as tutor_company,
                        tutors.description as tutor_description, tutors.photo as tutor_photo, tutors.position as tutor_position
                        FROM classes
                        JOIN class_categories ON classes.category_id = class_categories.id
                        LEFT JOIN tutors ON tutors.id = (SELECT MIN(t.id) FROM tutors t WHERE t.class_id = classes.id)
                        ${where}`);
    return rows;
};

const getClass = async (id) => {
    const [rows] = await dbPool.execute(`SELECT classes.*, class_categories.name as category
                        FROM classes
                        JOIN class_categories ON classes.category_id = class_categories.id
                        WHERE classes.id = ${id}`);
    return (rows.length > 0) ? rows[0] : false;
};

module.exports = { getAllClasses, getClass };