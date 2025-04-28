const express = require('express')
const router = express.Router()

const {StoreUser,UpdateUser, GetProfile, SignIn, SignOut, GetMyClasses}  = require('../controllers/UserController')
const { verifyToken, is_guest } = require('../middlewares/authmiddleware')

router.post('/login',is_guest, SignIn)

router.post('/logout',verifyToken, SignOut)

router.post('/register',is_guest, StoreUser)

router.patch('/update',verifyToken, UpdateUser)

router.get('/profile',verifyToken, GetProfile)

router.get('/classes',verifyToken, GetMyClasses)

module.exports = router