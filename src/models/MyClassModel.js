const dbPool = require("../config/database");

// const getAllClasses = async (category_id="") => {
//     const where = (category_id !== "") ? `WHERE classes.category_id = ${category_id}` : "";
//     const [rows] = await dbPool.execute(`SELECT classes.*, class_categories.name as category
//                         , tutors.name as tutor, tutors.company as tutor_company,
//                         tutors.description as tutor_description, tutors.photo as tutor_photo, tutors.position as tutor_position,
//                         COALESCE(AVG(reviews.rating), 0) AS rating_average
//                         FROM classes
//                         JOIN class_categories ON classes.category_id = class_categories.id
//                         LEFT JOIN tutors ON tutors.id = (SELECT MIN(t.id) FROM tutors t WHERE t.class_id = classes.id)
//                         LEFT JOIN orders ON orders.class_id = classes.id
//                         LEFT JOIN reviews ON reviews.order_id = orders.id
//                         ${where} GROUP BY classes.id`);
//     return rows;
// };

const createMyClass = async (body) => {
    const [result] = await dbPool.execute(`INSERT INTO my_classes (status,order_id,modul_id,pretest_id,material_id) 
        VALUES ('pending', '${body.order_id}', '${body.modul_id}', '${body.pretest_id}', '${body.material_id}')`);
    return result;
};


const getMyClass = async (id) => {
    const [rows] = await dbPool.execute(`SELECT * FROM my_classes WHERE my_classes.id = ${id}`);
    return (rows.length > 0) ? rows[0] : false;
};

module.exports = { getMyClass, createMyClass };