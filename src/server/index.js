const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express() 
const PORT = 8000
const accounts = require('./database')
console.log(accounts) // { accountsModel: accounts }

 // body parser
app.use(cors())
app.use(bodyParser.json())

app.post('/accounts', async (req, res)=>{
    console.log("inside accounts api ...", req.body)
    const instance = await accounts.accountsModel.sync()
    const user = await instance.create({username:req.body.username, password:req.body.password, token:false})
    // user.increment('id')
    res.json({user,})

    })
    // const user = await instance.create({id:1, username:req.body.username, password:req.body.password, token:false})
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    // res.setHeader('Access-Control-Allow-Methods', 'POST')
    // res.setHeader("Access-Control-Allow-Origin", "*")
    // res.setHeader('Content-Type', 'application/json')
    // res.json(null)





app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})