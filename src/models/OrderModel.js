const dbPool = require("../config/database");

const getOrders = async (user_id="",status="",class_status="") => {
    let where = (user_id !== "") ? `WHERE orders.user_id = ${user_id}` : "";
    if (status !== "") {
        where += (where !== "") ? " AND " : "WHERE ";
        where += `orders.status = '${status}'`;
    }
    if (class_status !== "") {
        where += (where !== "") ? " AND " : "WHERE ";
        where += `orders.class_completed = '${class_status}'`;
    }
    
    const [rows] = await dbPool.execute(`SELECT payments.*, payments.status as payment_status,orders.*, 
                                classes.name, classes.description, class_categories.name as class_category, 
                                classes.photo, classes.page_title,
                                tutors.name as tutor, tutors.company as tutor_company,
                                tutors.description as tutor_description, tutors.photo as tutor_photo, tutors.position as tutor_position
                                FROM orders
                                JOIN payments ON orders.id = payments.order_id
                                JOIN classes ON classes.id = orders.class_id
                                JOIN class_categories ON class_categories.id = classes.category_id
                                LEFT JOIN tutors ON tutors.id = (SELECT MIN(t.id) FROM tutors t WHERE t.class_id = classes.id)
                                ${where}`);
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
                                        tutors.description as tutor_description, tutors.photo as tutor_photo, tutors.position as tutor_position
                                        FROM orders 
                                        INNER JOIN payments ON orders.id = payments.order_id
                                        JOIN classes ON classes.id = orders.class_id
                                        JOIN class_categories ON class_categories.id = classes.category_id
                                        LEFT JOIN tutors ON tutors.id = (SELECT MIN(t.id) FROM tutors t WHERE t.class_id = classes.id)
                                        WHERE orders.id = ${id}`);
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

module.exports = { getOrders, createOrder, updateOrder, getOrder };