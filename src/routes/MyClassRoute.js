const express = require('express')
const router = express.Router()

const { GetMyClass, ProcessMyClass, SendAnswer, SubmitPretest, SubmitQuiz } = require('../controllers/MyClassController')

router.get('/:id', GetMyClass)

router.patch('/process', ProcessMyClass)

router.patch('/send_answer', SendAnswer)

router.patch('/submit_pretest', SubmitPretest)

router.patch('/submit_quiz', SubmitQuiz)

module.exports = router