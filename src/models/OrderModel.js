const dbPool = require("../config/database");
const { getAllMyClasses } = require("./MyClassModel");

const GetProgress = async (orderId) => {
    const completed = await getAllMyClasses(orderId,"completed");
    const myClasess = await getAllMyClasses(orderId);
    const progress = myClasess.length > 0 ? Math.round((completed.length / myClasess.length) * 100) : 0;
    return progress;
}

const CheckProgress = async (orderId) => {
    const order = await getOrder(orderId);
    const progress = await GetProgress(orderId);
    if (progress === 100 && order.pretest_score != null && order.quiz_score === 0) {
        const now = new Date();
        const completedAt = now.toISOString().slice(0, 19).replace('T', ' ');
        await updateOrder({"class_completed":1,"completed_at":completedAt},orderId);
    }
    return true;
}

const getOrders = async (filters) => {
    let where = (filters.user_id) ? `WHERE orders.user_id = ${filters.user_id}` : "";
    if (filters.status) {
        where += (where !== "") ? " AND " : "WHERE ";
        where += `orders.status = '${filters.status}'`;
    }
    if (filters.class_status) {
        where += (where !== "") ? " AND " : "WHERE ";
        where += `orders.class_completed = '${filters.class_status}'`;
    }

    let limitClause = "";
    // Pagination
    const limit = Number(filters.limit) || 10;
    const page = Number(filters.page) || 1;
    const offset = (page - 1) * limit;
    limitClause = `LIMIT ${limit} OFFSET ${offset}`;
    console.log(limitClause,where);
    
    const [rows] = await dbPool.execute(`SELECT payments.*, payments.status as payment_status,orders.*, 
                                classes.name, classes.description, class_categories.name as class_category, 
                                classes.photo, classes.page_title,
                                tutors.name as tutor, tutors.company as tutor_company,
                                tutors.description as tutor_description, tutors.photo as tutor_photo, tutors.position as tutor_position,
                                COUNT(my_classes.id) AS total_my_classes,
                                SUM(CASE WHEN my_classes.status = 'completed' THEN 1 ELSE 0 END) AS completed_my_classes,
                                ROUND(
                                    (SUM(CASE WHEN my_classes.status = 'completed' THEN 1 ELSE 0 END) / 
                                    COUNT(my_classes.id)) * 100
                                ) AS progress
                                FROM orders
                                JOIN payments ON orders.id = payments.order_id
                                JOIN classes ON classes.id = orders.class_id
                                JOIN class_categories ON class_categories.id = classes.category_id
                                LEFT JOIN tutors ON tutors.id = (SELECT MIN(t.id) FROM tutors t WHERE t.class_id = classes.id)
                                LEFT JOIN my_classes ON my_classes.order_id = orders.id
                                ${where} GROUP BY orders.id ${limitClause}`);
    return rows;
};

const createOrder = async (body) => {
    const [result] = await dbPool.execute(`INSERT INTO orders (price,status,created_at,class_id,user_id) 
        VALUES ('${body.price}', '${body.status}', '${body.created_at}', '${body.class_id}', '${body.user_id}')`);
    return result;
};

const getOrder = async (id) => {
    const [order] = await dbPool.execute(`SELECT payments.*, payments.status as payment_status,orders.*,
                                        classes.name, classes.description, class_categories.name as class_category, 
                                        classes.photo, classes.page_title,
                                        tutors.name as tutor, tutors.company as tutor_company,
                                        tutors.description as tutor_description, tutors.photo as tutor_photo, tutors.position as tutor_position,
                                        COUNT(my_classes.id) AS total_my_classes,
                                        SUM(CASE WHEN my_classes.status = 'completed' THEN 1 ELSE 0 END) AS completed_my_classes,
                                        ROUND(
                                            (SUM(CASE WHEN my_classes.status = 'completed' THEN 1 ELSE 0 END) / 
                                            COUNT(my_classes.id)) * 100
                                        ) AS progress
                                        FROM orders 
                                        INNER JOIN payments ON orders.id = payments.order_id
                                        JOIN classes ON classes.id = orders.class_id
                                        JOIN class_categories ON class_categories.id = classes.category_id
                                        LEFT JOIN tutors ON tutors.id = (SELECT MIN(t.id) FROM tutors t WHERE t.class_id = classes.id)
                                        LEFT JOIN my_classes ON my_classes.order_id = orders.id
                                        WHERE orders.id = ${id} GROUP BY orders.id`);
    return (order.length > 0) ? order[0] : false;
}

const updateOrder = async (body,id) => {
    const keys = Object.keys(body);
    if (keys.length === 0) {
        return { error: true, message: 'Tidak ada data untuk diupdate'};
    }
    const setQuery = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => body[key]);
    const rows = await dbPool.execute(`UPDATE orders SET ${setQuery} WHERE id = ${id}`,values);
    return rows;
};

const deleteReview = (orderId) => {
    const rows = dbPool.execute(`DELETE FROM reviews WHERE order_id = ${orderId}`);
    return rows;
};

module.exports = { getOrders, createOrder, updateOrder, getOrder,CheckProgress, GetProgress, deleteReview };