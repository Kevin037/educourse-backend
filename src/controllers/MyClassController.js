const {getOrders, createOrder, updateOrder, getOrder} = require('../models/OrderModel');
const jwt = require("jsonwebtoken");
const { createPayment, updatePayment } = require('../models/PaymentModel');
const { createReview } = require('../models/ReviewModel');
const { getMyClass, getAllMyModules, getAllMyPretests, getAllMyMaterials } = require('../models/MyClassModel');
const { getModule } = require('../models/ModuleModel');
const { getPretest } = require('../models/PretestModel');
const { getMaterial } = require('../models/MaterialModel');

const GetMyClass = async (req,res) => {
   try {
      const myClass = await getMyClass(req.params.id);
      const module = await getModule(myClass.module_id);
      const pretest = await getPretest(myClass.pretest_id);
      const quiz = await getMaterial(myClass.material_id);
      const myModules = await getAllMyModules(myClass.order_id);
      myClass.modules = myModules;
      myClass.module = module;
      myClass.pretest = pretest;
      myClass.quiz = quiz;
      if (myClass.pretest_id != null) {
         const pretests = await getAllMyPretests(myClass.order_id);
         myClass.pretests = pretests;
      }
      if (myClass.material_id != null) {
         const materials = await getAllMyMaterials(myClass.order_id);
         myClass.quizes = materials;
      }
      res.status(200).json({error:0,data:myClass});
   } catch (error) {
      res.status(400).json({ error });
   }
}

module.exports = {GetMyClass};