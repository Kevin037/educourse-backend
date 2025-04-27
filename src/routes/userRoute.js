const express = require('express')
const router = express.Router()

const {StoreUser,UpdateUser,DeleteUser, GetProfile, SignIn, SignOut, GetMyClasses}  = require('../controllers/UserController')

router.post('/login', SignIn)

router.get('/logout', SignOut)

router.post('/register', StoreUser)

router.patch('/update', UpdateUser)

router.delete('/:id', DeleteUser)

router.get('/profile', GetProfile)

router.get('/classes', GetMyClasses)

module.exports = router