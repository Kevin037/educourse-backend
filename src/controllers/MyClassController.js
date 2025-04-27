const {getOrders, createOrder, updateOrder, getOrder} = require('../models/OrderModel');
const jwt = require("jsonwebtoken");
const { createPayment, updatePayment } = require('../models/PaymentModel');
const { createReview } = require('../models/ReviewModel');
const { getMyClass } = require('../models/MyClassModel');
const { getModule } = require('../models/ModuleModel');
const { getPretest } = require('../models/PretestModel');
const { getMaterial } = require('../models/MaterialModel');

const GetMyClass = async (req,res) => {
   try {
      const myClass = await getMyClass(req.params.id);
      const module = await getModule(myClass.module_id);
      const pretest = await getPretest(myClass.pretest_id);
      const quiz = await getMaterial(myClass.quiz_id);
      myClass.module = module;
      myClass.pretest = pretest;
      myClass.quiz = quiz;
      res.status(200).json({error:0,data:myClass});
   } catch (error) {
      res.status(400).json({ error });
   }
}

module.exports = {getMyClass};