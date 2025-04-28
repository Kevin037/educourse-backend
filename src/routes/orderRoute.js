const express = require('express')
const router = express.Router()

const { StoreOrder, GetMyOrders, GetOrder, ChangePayment, ProcessPayment, StoreReview } = require('../controllers/OrderController')
const { verifyToken } = require('../middlewares/authmiddleware')

router.post('/',verifyToken, StoreOrder)

router.post('/review',verifyToken, StoreReview)

router.patch('/change_payment',verifyToken, ChangePayment)

router.patch('/process_payment',verifyToken, ProcessPayment)

router.get('/:id',verifyToken, GetOrder)

router.get('/',verifyToken, GetMyOrders)

module.exports = router