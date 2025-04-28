const express = require('express')
const router = express.Router()

const { GetMyClass } = require('../controllers/MyClassController')

router.get('/:id', GetMyClass)

module.exports = router