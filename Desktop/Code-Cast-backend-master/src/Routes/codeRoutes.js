const express = require('express')
const codeRouter = new express.Router()
const url = require('./../utils/constants/appConstants')
const auth = require('./../middleware/auth')
const validateCode = require('./../validator/validateCode')
const codeCtrl = require('./../controllers/codeCtrl')

//! expectiong req.body to have {code: 'code to be executed', language: 'language of the code'}
codeRouter.post(url.CODE.EXECUTE, auth, validateCode, codeCtrl.execute)

// socket.io send and recieve code from client and forward it to the other client


module.exports = codeRouter