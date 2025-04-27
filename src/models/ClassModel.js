const dbPool = require("../config/database");
const bcrypt = require("bcrypt");

const getAllClasses = async (category_id="") => {
    console.log(category_id);
    
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

module.exports = { getAllClasses };