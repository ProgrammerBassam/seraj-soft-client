const express = require('express')

const messagesRouter = require('../modules/messages/messages.routes')

const router = express.Router()

router.use('/messages', messagesRouter)

module.exports = router