const express = require('express')
const router = express.Router()

const {GetClasses}  = require('../controllers/ClassController')

router.get('/', GetClasses)

module.exports = router