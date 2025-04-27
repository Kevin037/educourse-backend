const {getAllClassCategories} = require('../models/ClassCategoryModel');

const GetClassCategories = async (req,res) => {
   try {
      const class_categories = await getAllClassCategories();
      res.status(200).json({error:0,data:class_categories});
   } catch (error) {
      res.status(400).json({ error });
   }
}

module.exports = {GetClassCategories}; 