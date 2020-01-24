const { age, date } = require('../../lib/utils')
const Instructor = require('../models/Instructor')

module.exports = {
    //INDEX
    index(req, res){
        
        Instructor.all(function(instructors){
            return res.render('instructors/index', { instructors })
        })
    },

    //CREATE
    create(req, res){
        return res.render("instructors/create")
    },

    //POST
    post(req, res){
        const keys = Object.keys(req.body)
    
        for( key of keys ) {
            if (req.body[key] == "")
                return res.send('Please, fill all fields')
        }

        Instructor.create(req.body, function(instructor){
            return res.redirect(`/instructor/${instructor.id}`)
        })
        
    },

    //SHOW
    show(req, res){
        Instructor.find(req.params.id, function(instructor){
            if (!instructor) return res.send('Instructor not found!')

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")

            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        }) 
    },
    
    //EDIT
    edit(req, res){
        return 
    },

    //PUT
    put(req, res){
        const keys = Object.keys(req.body)
    
        for( key of keys ) {
            if (req.body[key] == "")
                return res.send('Please, fill all fields')
        }

        let { avatar_url, birth, name, gender, services } = req.body
        
        return 
    },

    //DELETE
    delete(req, res){
        return 
    }
}