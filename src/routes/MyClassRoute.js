const express = require('express')
const router = express.Router()

const { GetMyClass, ProcessMyClass, SendAnswer, SubmitPretest, SubmitQuiz } = require('../controllers/MyClassController')
const { verifyToken } = require('../middlewares/authmiddleware')

router.get('/:id',verifyToken, GetMyClass)

router.patch('/process',verifyToken, ProcessMyClass)

router.patch('/send_answer',verifyToken, SendAnswer)

router.patch('/submit_pretest',verifyToken, SubmitPretest)

router.patch('/submit_quiz',verifyToken, SubmitQuiz)

module.exports = router