const dbPool = require("../config/database");

const getAllClasses = async (filters) => {
    let whereClauses = [];
    let havingClauses = [];
    let orderByClause = "";
    let limitClause = "";

    // Pagination
    const limit = Number(filters.limit) || 10;
    const page = Number(filters.page) || 1;
    const offset = (page - 1) * limit;
    limitClause = `LIMIT ${limit} OFFSET ${offset}`;

    // Filter kategori
    if (filters.category_id) {
        whereClauses.push(`classes.category_id = ${filters.category_id}`);
    }

    // Filter harga (range)
    if (filters.price_min) {
        whereClauses.push(`classes.new_price >= ${filters.price_min}`);
    }
    if (filters.price_max) {
        whereClauses.push(`classes.new_price <= ${filters.price_max}`);
    }

    // Filter durasi (range jam)
    if (filters.duration_min && filters.duration_max) {
        havingClauses.push(`total_duration BETWEEN ${filters.duration_min} AND ${filters.duration_max}`);
    } else {
        if (filters.duration_min) {
            havingClauses.push(`total_duration >= ${filters.duration_min}`);
        }
        if (filters.duration_max) {
            havingClauses.push(`total_duration <= ${filters.duration_max}`);
        }
    }

    // Pencarian nama kelas
    if (filters.search) {
        whereClauses.push(`classes.name LIKE '%${filters.search}%'`);
    }

    // Sorting
    if (filters.order_by) {
        switch (filters.order_by) {
            case "price_low":
                orderByClause = `ORDER BY classes.new_price ASC`;
                break;
            case "price_high":
                orderByClause = `ORDER BY classes.new_price DESC`;
                break;
            case "atoz":
                orderByClause = `ORDER BY classes.name ASC`;
                break;
            case "ztoa":
                orderByClause = `ORDER BY classes.name DESC`;
                break;
            case "rating_high":
                orderByClause = `ORDER BY rating_average DESC`;
                break;
            case "rating_low":
                orderByClause = `ORDER BY rating_average ASC`;
                break;
        }
    }

    const where = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
    const having = havingClauses.length > 0 ? `HAVING ${havingClauses.join(" AND ")}` : "";
    const [rows] = await dbPool.execute(`SELECT classes.*, class_categories.name as category
                        , tutors.name as tutor, tutors.company as tutor_company,
                        tutors.description as tutor_description, tutors.photo as tutor_photo, tutors.position as tutor_position,
                        COALESCE(AVG(reviews.rating), 0) AS rating_average,
                        COALESCE(SUM(modules.duration), 0) AS total_duration
                        FROM classes
                        JOIN class_categories ON classes.category_id = class_categories.id
                        LEFT JOIN tutors ON tutors.id = (SELECT MIN(t.id) FROM tutors t WHERE t.class_id = classes.id)
                        LEFT JOIN orders ON orders.class_id = classes.id
                        LEFT JOIN reviews ON reviews.order_id = orders.id
                        LEFT JOIN modules ON modules.class_id = classes.id
                        ${where} GROUP BY classes.id ${having} ${orderByClause} ${limitClause}`);
    return rows;
};

const getClass = async (id) => {
    const [rows] = await dbPool.execute(`SELECT classes.*, class_categories.name as category,
                        COALESCE(AVG(reviews.rating), 0) AS rating_average
                        FROM classes
                        JOIN class_categories ON classes.category_id = class_categories.id
                        LEFT JOIN orders ON orders.class_id = classes.id
                        LEFT JOIN reviews ON reviews.order_id = orders.id
                        WHERE classes.id = ${id} GROUP BY classes.id`);
    return (rows.length > 0) ? rows[0] : false;
};

module.exports = { getAllClasses, getClass };