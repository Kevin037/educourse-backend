const dbPool = require("../config/database");

const createPayment = async (body) => {
    const rows = await dbPool.execute(`INSERT INTO payments (payment_method,expired_at,status,order_id) 
                                VALUES ('${body.payment_method}', '${body.expired_at}', '${body.status}', '${body.order_id}')`);
    return rows;
};

const updatePayment = async (body,order_id) => {
    const keys = Object.keys(body);
    if (keys.length === 0) {
        return { error: true, message: 'Tidak ada data untuk diupdate'};
    }
    const setQuery = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => body[key]);
    const rows = await dbPool.execute(`UPDATE payments SET ${setQuery} WHERE order_id = '${order_id}'`,values);
    return rows;
};

module.exports = { createPayment, updatePayment };