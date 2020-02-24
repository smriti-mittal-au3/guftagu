const tables = require('./database')
const createOrUpdate = require('./utility')
// console.log("all tables: ", tables) //it was slow man :O
const {Op} = require('sequelize')

module.exports.storeChats = (to, from, text)=>{
    console.log("inside chats controller")
    // tables.accounts.findOne({
    //     where:{
    //         username:to
    //     }
        
    // })
    // .then(instance => {
        createOrUpdate(tables, to+from, to, from, text, tables.sequelize)
    
}


module.exports.findChats = async (nickname, cb)=>{
    console.log(nickname)
    chats = await tables.chats.findOne({where:{nickname}})

    cb(!chats? []: chats.dataValues.text)

    // .then(data => {
    //     console.log("getting stored text", data)
    //     prevChats = !data? []: data.dataValues.text 

    // })
    // .catch(err => {console.log(err); return []})
}






module.exports.accounts = (req, res)=>{
    console.log("inside accounts api", req.body.email)
    tables.accounts.sync()
    .then((instance) => {
        instance.create({
            email:req.body.email,
            username:req.body.username, 
            password:req.body.password,
            token:req.body.token
        }//,
        // {
        //     include: [{model:tables.chats, as:'chats'}]
        // }
        )
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

module.exports.login=(req,res)=>{
      //console.log(data)
      tables.accounts.findOne({
              where:{
                  email:req.body.email
              }
              
          })
          //console.log(data)
          .then((data)=>{
              if(!data || (!data.validPassword(req.body.password))){
                  res.status(400).send('notok')
              }else{
                //   delete data[password]
                  res.json(data)
              }  
          })
          .catch(err=>{
            res.statusMessage = err.name
              res.status(400).end()
          })
      } 

module.exports.search = (req, res) => {
        let search = req.params.search 
        console.log("inside search controller:", search)
        tables.accounts.findAll({
            where : { 
                username: {[Op.substring]:search}
                
            }
        })
        .then(result => {
            res.json({results:result})
        })
        .catch(err => console.log("Error searching for users: ", err))
    }


module.exports.contacts = (req, res) => {
    let from = req.params.from
    console.log("inside contacts controller:", from)
    tables.chats.findAll({
        where: {from},
        // include: [{model:tables.accounts, as:'accounts'}]
        include: [tables.accounts]
    })
    .then(result => {
        // [{}, {}, {}] ..etc
        // .get() gets the dataValues .. for obj, not arr
        console.log("inside contacts controller results") // result.get() is not a func ..
        res.json({results:result?result.map(row=>{console.log(row.get().account.get()); return row.get().account.get()}):[]}) // ['sm2', 'smriti4', 'smriti3']
    })
    .catch(err => console.log("Error getting contacts for: ", from, "-", err))
}