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

const updateUser = (body,idUser) => {
    const rows = dbPool.execute(`UPDATE users SET name = '${body.name}', email = '${body.email}', no_hp = '${body.no_hp}', password = '${body.password}' WHERE id = ${idUser}`);
    return rows;
};

const deleteUser = (idUser) => {
    const rows = dbPool.execute(`DELETE FROM users WHERE id = ${idUser}`);
    return rows;
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };