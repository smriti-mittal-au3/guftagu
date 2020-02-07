const accounts = require('./database')

module.exports.accounts = (req, res)=>{
    console.log("inside accounts api", req.body)
    accounts.sync()
    .then((instance) => {
        instance.create({
            email:req.body.email,
            username:req.body.username, 
            password:req.body.password, 
            token:req.body.token
        })
    .then(data=>{
        // console.log(data)
        // const error = null 
        // res.json({error:error, data,})
        res.send(200).send('OK')
    })
    // then res.send header 200 OK
    .catch((err) => {
        // exception: duplicate email
        console.log(err.name)
        res.statusMessage = err.name
        res.status(400).end()
        // res.json({error:err, data:[]})
    })

})


    }

