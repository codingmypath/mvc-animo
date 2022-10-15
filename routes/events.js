const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/events') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, eventsController.getEvents)

router.post('/createEvent', eventsController.createEvent)

router.delete('/deleteEvent', eventsController.deleteEvent)

router.get('/', eventsController.getEvent)

module.exports = router