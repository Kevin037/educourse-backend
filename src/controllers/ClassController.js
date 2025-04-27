const {getAllClasses} = require('../models/ClassModel');

const GetClasses = async (req,res) => {
   try {
      const category_id = req.query.category_id;
      const classes = await getAllClasses(category_id);
      res.status(200).json({error:0,data:classes});
   } catch (error) {
      res.status(400).json({ error });
   }
}

module.exports = {GetClasses}; 