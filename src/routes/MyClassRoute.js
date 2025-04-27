const express = require('express')
const router = express.Router()

const { getMyClass } = require('../models/MyClassModel')

router.get('/:id', getMyClass)

module.exports = router