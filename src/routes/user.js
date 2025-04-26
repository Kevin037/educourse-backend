const express = require('express')
const router = express.Router()

const {StoreUser,UpdateUser,DeleteUser, GetUser}  = require('../controllers/UserController')

router.get('/', GetUser)

router.post('/', StoreUser)

module.exports = router