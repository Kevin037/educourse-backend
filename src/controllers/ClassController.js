const {getAllClasses, getClass} = require('../models/ClassModel');
const { getAllModules } = require('../models/ModuleModel');
const { getAllTutors } = require('../models/tutorModel');

const GetClasses = async (req,res) => {
   try {
      const category_id = req.query.category_id;
      const classes = await getAllClasses(category_id);
      res.status(200).json({error:0,data:classes});
   } catch (error) {
      res.status(400).json({ error });
   }
}

const GetClass = async (req,res) => {
   try {
      const arr = [
         {
            id: 1,
            name: "English"
         },
         {
            id: 2,
            name: "Math"
         },
         {
            id: 3,
            name: "Science"
         }
      ]
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