const Sequelize = require('sequelize')
const accounts = require('./models')
const sequelize = new Sequelize('postgres://smriti:smriti@localhost:5432/smriti')


sequelize.authenticate()
.then(() => console.log('database connection made!'))
.catch(() => console.log("connection to db failed!"))

const accountsModel = accounts(sequelize, Sequelize)
console.log(accountsModel)

module.exports =  accountsModel


