const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    //INDEX
    index(req, res){
        return res.render("instructors/index")
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

        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ( $1, $2, $3, $4, $5, $6 )
            RETURNING id
        `

        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results){
            if ( err ) return res.send("Database error!")

            return res.redirect(`/instructors/${results.rows[0].id}`)
            console.log('teste')
        })
        
    },

    //SHOW
    show(req, res){
        return 
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