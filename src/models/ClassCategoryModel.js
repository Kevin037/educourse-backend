const dbPool = require("../config/database");
const bcrypt = require("bcrypt");

const getAllClassCategories = async () => {
    const [rows] = await dbPool.execute("SELECT * FROM class_categories");
    return rows;
};

module.exports = { getAllClassCategories };