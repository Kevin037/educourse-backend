const dbPool = require("../config/database");

const getOrders = async (user_id="") => {
    const where = (user_id !== "") ? `WHERE orders.user_id = ${user_id}` : "";
    const [rows] = await dbPool.execute(`SELECT orders.*,payments.* FROM orders 
                                JOIN payments ON orders.id = payments.order_id
                                ${where}`);
    return rows;
};

const createOrder = async (body) => {
    const [result] = await dbPool.execute(`INSERT INTO orders (price,status,created_at,class_id,user_id) 
        VALUES ('${body.price}', '${body.status}', '${body.created_at}', '${body.class_id}', '${body.user_id}')`);
    return result;
};

const getOrder = async (id) => {
    const [order] = await dbPool.execute(`SELECT payments.*, payments.status as payment_status,orders.*
                                        FROM orders INNER JOIN payments ON orders.id = payments.order_id WHERE orders.id = ${id}`);
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