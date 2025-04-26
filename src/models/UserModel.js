const dbPool = require("../config/database");
const bcrypt = require("bcrypt");

const getAllUsers = () => {
    const rows = dbPool.execute("SELECT * FROM users");
    return rows;
};

const createUser = async (body) => {
    const password = await bcrypt.hash(body.password, 10);
    const rows = dbPool.execute(`INSERT INTO users (name,email,	no_hp,password) 
                                VALUES ('${body.name}', '${body.email}', '${body.no_hp}', '${password}')`);
    return rows;
};

const getUser = async (email, sync=false) => {
    const attr = (sync) ? '*' : 'id, name, email, no_hp, photo';
    const [user] = await dbPool.execute(`SELECT ${attr} FROM users WHERE email = '${email}'`);
    return (user.length > 0) ? user[0] : false;
}

const updateUser = async (body,email) => {
    const keys = Object.keys(body);
    if (keys.length === 0) {
        return { error: true, message: 'Tidak ada data untuk diupdate'};
    }
    const setQuery = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => body[key]);
    const rows = await dbPool.execute(`UPDATE users SET ${setQuery} WHERE email = '${email}'`,values);
    return rows;
};

const deleteUser = (idUser) => {
    const rows = dbPool.execute(`DELETE FROM users WHERE id = ${idUser}`);
    return rows;
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUser };