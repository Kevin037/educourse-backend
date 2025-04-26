const express = require('express')
const router = express.Router()

const {StoreUser,UpdateUser,DeleteUser, GetUser}  = require('../controllers/UserController')

router.get('/', GetUser)

router.post('/', StoreUser)

router.patch('/:id', UpdateUser)

router.delete('/:id', DeleteUser)

module.exports = router