const dbPool = require("../config/database");

const createReview = async (body) => {
    const [result] = await dbPool.execute(`INSERT INTO reviews (rating,description,order_id) 
        VALUES ('${body.rating}', '${body.description}', '${body.order_id}')`);
    return result;
};

module.exports = { createReview };