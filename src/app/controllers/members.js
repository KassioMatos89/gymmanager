const { age, date } = require('../../lib/utils')
const Member = require('../models/Member')

module.exports = {
    //INDEX
    index(req, res){
        
        Member.all(function(members){
            return res.render('members/index', { members })
        })
    },

    //CREATE
    create(req, res){
        return res.render("members/create")
    },

    //POST
    post(req, res){
        const keys = Object.keys(req.body)
    
        for( key of keys ) {
            if (req.body[key] == "")
                return res.send('Please, fill all fields')
        }

        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`)
        })
        
    },

    //SHOW
    show(req, res){
        Member.find(req.params.id, function(member){
            if (!member) return res.send('Member not found!')

            member.birth = date(member.birth).birthDay

            member.created_at = date(member.created_at).format

            return res.render("members/show", { member })
        })
    },
    
    //EDIT
    edit(req, res){
        Member.find(req.params.id, function(member){
            if (!member) return res.send('Member not found!')

            member.birth = date(member.birth).iso

            return res.render("members/edit", { member })
        }) 
    },

    //PUT
    put(req, res){
        const keys = Object.keys(req.body)
    
        for( key of keys ) {
            if (req.body[key] == "")
                return res.send('Please, fill all fields')
        }

        Member.update(req.body, function(){
            return res.redirect(`/members/${req.body.id}`)
        })
    },

    //DELETE
    delete(req, res){
        Member.delete(req.body.id, function(){
            return res.redirect("/members")
        }) 
    }
}
//teste