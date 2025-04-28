const express = require('express')
const router = express.Router()

const { GetMyClass, ProcessMyClass, SendAnswer } = require('../controllers/MyClassController')

router.get('/:id', GetMyClass)

router.patch('/process', ProcessMyClass)

router.patch('/send_answer', SendAnswer)

module.exports = router