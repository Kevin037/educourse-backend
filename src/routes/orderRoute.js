const express = require('express')
const router = express.Router()

const { StoreOrder, GetMyOrders, GetOrder, ChangePayment, ProcessPayment, StoreReview } = require('../controllers/OrderController')

router.post('/', StoreOrder)

router.post('/review', StoreReview)

router.patch('/change_payment/:id', ChangePayment)

router.patch('/process_payment/:id', ProcessPayment)

router.get('/:id', GetOrder)

router.get('/', GetMyOrders)

module.exports = router