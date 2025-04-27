const express = require('express')
const router = express.Router()

const {GetClasses, GetClass}  = require('../controllers/ClassController')

router.get('/:id', GetClass)

router.get('/', GetClasses)

module.exports = router