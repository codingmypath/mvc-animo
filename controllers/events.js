const Event = require('../models/Event')

module.exports = {
    getEvents: async (req,res) => {
        console.log(req.user)
        try{
            const todoItems = await Event.find({userId:req.user.id})

            res.render('events.ejs', {title: todoItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createEvent: async (req, res)=>{
        try{
            await Event.create({
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
        console.log(req.body.eventIdFromJSFile)
        try{
            console.log(req.body.eventIdFromJSFile)
            await Todo.findOneAndDelete({_id:req.body.eventIdFromJSFile})
            console.log('Deleted Event')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }

}    

