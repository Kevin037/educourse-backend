const dbPool = require("../config/database");

const getAllMyClasses = async (orderId,status="") => {
    const where = (status !== "") ? ` AND my_classes.status = '${status}'` : "";
    const [rows] = await dbPool.execute(`SELECT * FROM my_classes WHERE my_classes.order_id = ${orderId} ${where}`);
    return rows;
};

const getAllMyModules = async (orderId) => {
    const [rows] = await dbPool.execute(`SELECT my_classes.*, modules.*
                        FROM my_classes
                        JOIN modules ON my_classes.module_id = modules.id
                        WHERE my_classes.order_id = ${orderId} AND my_classes.module_id IS NOT NULL`);
    return rows;
};

const getAllMyPretests = async (orderId) => {
    const [rows] = await dbPool.execute(`SELECT my_classes.*, pretests.*, my_classes.answer as user_answer
                        FROM my_classes
                        JOIN pretests ON my_classes.pretest_id = pretests.id
                        WHERE my_classes.order_id = ${orderId} AND my_classes.pretest_id IS NOT NULL`);
    return rows;
};

const getAllMyMaterials = async (orderId) => {
    const [rows] = await dbPool.execute(`SELECT my_classes.*, materials.*, my_classes.answer as user_answer
                        FROM my_classes
                        JOIN materials ON my_classes.material_id = materials.id
                        WHERE my_classes.order_id = ${orderId} AND my_classes.material_id IS NOT NULL`);
    return rows;
};

const createMyClass = async (body) => {
    const [result] = await dbPool.execute(`INSERT INTO my_classes (status,order_id,module_id,pretest_id,material_id) 
        VALUES (?, ?, ?, ?, ?)`,
        ['pending', body.order_id, body.module_id, body.pretest_id, body.material_id]
    );
    return result;
};


const getMyClass = async (id) => {
    const [rows] = await dbPool.execute(`SELECT * FROM my_classes WHERE my_classes.id = ${id}`);
    return (rows.length > 0) ? rows[0] : false;
};

const updateMyClass = async (body,id) => {
    const keys = Object.keys(body);
    if (keys.length === 0) {
        return { error: true, message: 'Tidak ada data untuk diupdate'};
    }
    const setQuery = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => body[key]);
    const rows = await dbPool.execute(`UPDATE my_classes SET ${setQuery} WHERE id = ${id}`,values);
    return rows;
};

module.exports = { getMyClass, createMyClass, getAllMyModules, getAllMyPretests, getAllMyMaterials, updateMyClass, getAllMyClasses };