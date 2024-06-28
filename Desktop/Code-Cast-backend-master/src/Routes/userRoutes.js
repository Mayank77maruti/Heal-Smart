const express = require('express')
const userRouter = new express.Router()
const userCtrl = require('./../controllers/userCtrl')
const auth = require('./../middleware/auth')
const url = require('./../utils/constants/appConstants')

userRouter.post(url.USERS.LOGIN, userCtrl.login)
userRouter.get(url.USERS.FETCH, auth, userCtrl.fetch)
userRouter.delete(url.USERS.DELETE, auth, userCtrl.deleteUser)
userRouter.patch(url.USERS.UPDATE, auth, userCtrl.updateUser)
userRouter.post(url.USERS.REGISTER, userCtrl.register)

module.exports = userRouter