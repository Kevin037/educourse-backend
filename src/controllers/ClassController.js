const {getAllClasses, getClass} = require('../models/ClassModel');
const { getAllModules } = require('../models/ModuleModel');
const { getAllTutors } = require('../models/tutorModel');

const GetClasses = async (req,res) => {
   try {
      const filters = {
         category_id: req.query.category_id || null,
         price_min: req.query.price_min || null,
         price_max: req.query.price_max || null,
         duration_min: req.query.duration_min || null,
         duration_max: req.query.duration_max || null,
         search: req.query.search || null,
         order_by: req.query.order_by || null,
         limit: req.query.limit || 10,
         page: req.query.page || 1
     };
      const classes = await getAllClasses(filters);
      res.status(200).json({error:0,data:classes});
   } catch (error) {
      res.status(400).json({ error });
   }
}

const GetClass = async (req,res) => {
   try {
      const classData = await getClass(req.params.id);
      const tutors = await getAllTutors(req.params.id);
      const mudules = await getAllModules(req.params.id);
      classData.tutors = tutors;
      classData.modules = mudules;
      res.status(200).json({error:0,data:classData});
   } catch (error) {
      res.status(400).json({ error });
   }
}

module.exports = {GetClasses,GetClass}; 