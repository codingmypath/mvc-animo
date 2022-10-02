const Event = require('../models/Event')

module.exports = {
    getEvents: async (req,res) => {
        try{
            const eventItems = await Event.find({userId:req.user.id})
            console.log("eventItems = " + eventItems)
            res.render('events.ejs', {events: eventItems})
        }catch(err){
            console.log(err)
        }
    },
    createEvent: async (req, res)=>{
        try{
            await Event.create({
                date: req.body.date,
                title: req.body.title,
                mood: req.body.mood, 
                description: req.body.description, 
                userId: req.user.id
            })
            console.log("testing = " + req.body.title)
            console.log('Event has been added!')
            res.redirect('/events')
        }catch(err){
            console.log(err)
        }
    },
    deleteEvent: async (req, res)=>{
        try{
            console.log(req.body.eventIdFromJSFile)
            await Event.findOneAndDelete({date: req.body.date})
            console.log('Deleted Event')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }

}    



