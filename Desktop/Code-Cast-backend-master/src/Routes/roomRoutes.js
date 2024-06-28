const express = require('express')
const roomRouter = new express.Router()
const roomCtrl = require('./../controllers/roomCtrl')
const auth = require('./../middleware/auth')
const roomData = require('./../middleware/roomData')
const url = require('./../utils/constants/appConstants')


roomRouter.post(url.ROOMS.CREATE, auth, roomData, roomCtrl.createRoom)
roomRouter.get(url.ROOMS.FETCH, auth, roomCtrl.fetch)
roomRouter.patch(url.ROOMS.UPDATE, auth, roomCtrl.updateRoomInDatabase)
roomRouter.delete(url.ROOMS.DELETE, auth, roomCtrl.deleteRoom)



module.exports = roomRouter