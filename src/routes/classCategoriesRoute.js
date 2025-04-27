const express = require('express')
const router = express.Router()

const {GetClassCategories}  = require('../controllers/ClassCategoryController')

router.get('/', GetClassCategories)

module.exports = router