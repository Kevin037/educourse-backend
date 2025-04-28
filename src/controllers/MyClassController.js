const {updateOrder, CheckProgress, GetProgress} = require('../models/OrderModel');
const jwt = require("jsonwebtoken");
const { getMyClass, getAllMyModules, getAllMyPretests, getAllMyMaterials, updateMyClass } = require('../models/MyClassModel');
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
      const progress = await GetProgress(myClass.order_id);
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
      myClass.progress = progress;
      res.status(200).json({error:0,data:myClass});
   } catch (error) {
      res.status(400).json({ error });
   }
}

const ProcessMyClass = async (req,res) => {
   const myClass = await getMyClass(req.body.id)
   try {
      await updateMyClass({
           status: "completed",
       },req.body.id);
       await CheckProgress(myClass.order_id);
       res.status(200).json({error:0,data:"MyClass successfully updated."});
   } catch (error) {
       res.status(500).json({error:1,data:"Server error",message:error});
   }
}

const SendAnswer = async (req,res) => {
   try {
      await updateMyClass({
           status: "completed",
           answer: req.body.answer
       },req.body.id);
       res.status(200).json({error:0,data:"MyClass successfully updated."});
   } catch (error) {
       res.status(500).json({error:1,data:"Server error",message:error});
   }
}
const CalculateScore = (values) => {
   let score = 0;
   values.forEach(e => {
       if (e.user_answer == e.answer) {
           score += 1;
       }
   });
   score = (score / values.length) * 100;
   return score;
}

const SubmitPretest = async (req,res) => {
   try {
      const pretests = await getAllMyPretests(req.body.id);
      const score  = CalculateScore(pretests);
      await updateOrder({
         pretest_score: score,
       },req.body.id);
       await CheckProgress(req.body.id);
       res.status(200).json({error:0,data:"MyClass successfully updated."});
   } catch (error) {
       res.status(500).json({error:1,data:"Server error",message:error});
   }
}

const SubmitQuiz = async (req,res) => {
   try {
      const quizes = await getAllMyMaterials(req.body.id);
      const score  = CalculateScore(quizes);
      await updateOrder({
         quiz_score: score,
       },req.body.id);
       await CheckProgress(req.body.id);
       res.status(200).json({error:0,data:"MyClass successfully updated."});
   } catch (error) {
       res.status(500).json({error:1,data:"Server error",message:error});
   }
}

module.exports = {GetMyClass,ProcessMyClass,SendAnswer, SubmitPretest, SubmitQuiz};