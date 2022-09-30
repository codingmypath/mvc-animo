const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/events') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, eventsController.getEvents)

router.post('/createEvent', eventsController.createEvent)

router.delete('/deleteTodo', eventsController.deleteEvent)

module.exports = router