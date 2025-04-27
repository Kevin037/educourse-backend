const {getOrders, createOrder, updateOrder, getOrder} = require('../models/OrderModel');
const jwt = require("jsonwebtoken");
const { createPayment, updatePayment } = require('../models/PaymentModel');

const GetOrder = async (req,res) => {
   try {
      const Order = await getOrder(req.params.id);
      res.status(200).json({error:0,data:Order});
   } catch (error) {
      res.status(400).json({ error });
   }
}

const GetMyOrders = async (req,res) => {
    try {
        const token = req.cookies.token;
        const data = jwt.decode(token);
        const Orders = await getOrders(data.user.id);
        res.status(200).json({error:0,data:Orders});
    } catch (error) {
       res.status(400).json({ error });
    }
 }

const StoreOrder = async (req,res) => {
    try {
        const token = req.cookies.token;
        const data = jwt.decode(token);
        const now = new Date();
        const createdAt = now.toISOString().slice(0, 19).replace('T', ' ');
        req.body.created_at = createdAt;
        req.body.status = "pending";
        req.body.user_id = data.user.id;
        const Order = await createOrder(req.body);
        await updateOrder({"no":"HEL/VI/"+Date.now()+Order.insertId},Order.insertId);
        const oneHourLater = new Date(now.getTime() + (1 * 60 * 60 * 1000));
        const expired_at = oneHourLater.toISOString().slice(0, 19).replace('T', ' ');
        const payment = await createPayment({
            order_id: Order.insertId,
            payment_method: req.body.payment_method,
            expired_at: expired_at,
            status: "pending"
        });
        res.status(201).json({error:0,message: "Order successfully created."})
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

const ChangePayment = async (req,res) => {
    try {
        const now = new Date();
        const updatedAt = now.toISOString().slice(0, 19).replace('T', ' ');
        const Order = await updatePayment({
            payment_method: req.body.payment_method,
            updated_at: updatedAt
        },req.params.id);
        res.status(200).json({error:0,data:"Order successfully updated."});
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

const ProcessPayment = async (req,res) => {
    try {
        const now = new Date();
        const updatedAt = now.toISOString().slice(0, 19).replace('T', ' ');
        const order = await updateOrder({
            status: "success",
        },req.params.id);
        const payment = await updatePayment({
            paid_at: updatedAt,
            status: "paid",
            updated_at: updatedAt
        },req.params.id);
        res.status(200).json({error:0,data:"Order successfully updated."});
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

module.exports = {StoreOrder,ChangePayment,GetOrder,GetMyOrders,ProcessPayment}; 