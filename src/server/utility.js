module.exports = (models, nickname, to, from, text, sequelize) => {

    console.log("inside utility func:", nickname, text)
    
    return models.chats.findOrCreate({
        // account, not accountsUsername
        where:{'nickname':nickname, 'accountUsername': to}//,
        // include: [{model: models.accounts, as: 'accounts'}]
    })
    .then(instance => {
        console.log("find or create")
        // instance doesn't have .update func
        models.chats.update(
            {
                'text': sequelize.fn('array_append', sequelize.col('text'), text),
                'username': to,
                'from': from,
                'accountUsername': to
                // 'account': to
            },
            {where: {nickname}}
        )
        .then(() => console.log(`${nickname} chat row succesfully updated`, to))
        .catch((err)=> console.log(`${err} chat row failed to be updated`))
    })
}

//     return model
//     .findOne({
//         where:{nickname}
//     })
//     .then(item => {
//         console.log("item found?:",item)
//         if(!item){
//             // create 
//             model.sync()
//             .then(instance => 
//             instance
//             .create({
//                     nickname:nickname,
//                     text:text

//                 })
//             .then(()=> console.log(`${nickname} chat row succesfully created`))
//             .catch(()=> console.log(`${nickname} chat row failed to be created`))
//             )
//         }
//         else{
//             model
//             .update(
//                 {'text': sequelize.fn('array_append', sequelize.col('text'), text)},
//                 {where: {nickname}}
//             )
//             .then(() => console.log(`${nickname} chat row succesfully updated`))
//             .catch(()=> console.log(`${nickname} chat row failed to be updated`))
//         }
//     })
// }