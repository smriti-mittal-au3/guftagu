const bcrypt = require('bcrypt')


module.exports.accounts = (db) => {
    // to do: use hooks to convert password to a hash
    let accounts = db.define("accounts", {
        id:{
            type: db.Sequelize.INTEGER,
            // allowNull: false
            // default: sequelize.fn('uuid_generate_v4')
            // defaultValue:1,
            autoIncrement: true
        },
        
        email:{
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true

        },
        username:{
            type: db.Sequelize.STRING,
            // allowNull:false,
            // unique: true,
            primaryKey: true  
        },
        password:{
            type: db.Sequelize.STRING,
            allowNull:false
        },
        img:{
            type: db.Sequelize.STRING,
            defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRpB9iJgSSs49SaW_wSr8bQWqSQ_C5u_jMg326JfvgsHXHNOJQ'
        },
        token:{
            type: db.Sequelize.BOOLEAN,
            // values: ['true', 'false'],
            allowNull:false

        }

        },
        {
            hooks: {
                beforeCreate: (account) => {
                    account.password = bcrypt.hashSync(account.password, 10)
                    }
                },
        }
    )
    accounts.prototype.validPassword = function(password) {
                return bcrypt.compareSync(password, this.password);
            }

    // accounts.associate = function(models){
    //     accounts.hasMany(models.chats, {foreignKey: 'accountId', as:'chats'})
    // }

    return accounts
    
}


// don't need any associations it looks like
module.exports.chats = (db) => { 
    let chats = db.define('chats', {
        id: {
            type: db.Sequelize.INTEGER,
            // allowNull: false,
            // unique: true,
            autoIncrement: true
        },
        nickname: {
            type: db.Sequelize.STRING,
            // allowNull: false,
            primaryKey: true
        },

        username: {
            type: db.Sequelize.STRING,
        },

        // accountId: {
        //     type: Sequelize.STRING,
        //     // foreignKey: true,
        //     references: {
        //         model: 'accounts', // not 'Accounts'
        //         key: 'username'
        //     },
        //     // allowNull: false
        // },
        from: {
            type: db.Sequelize.STRING,
            // allowNull: false
        },
        text: {
            type: db.Sequelize.ARRAY(db.Sequelize.STRING)
            // type: Sequelize.STRING,
            // get: function() {
            //     return JSON.parse(this.getDataValue('text'));
            // }, 
            // set: function(val) {
            //     return this.setDataValue('text', JSON.stringify(val));
            // }

        }
    },
    {
        hooks:{
            afterFind: function(chats){
                // if no chats, then do nothing
                // console.log(chats)
                if(chats && chats.text)
                    chats.text = chats.text.map(obj => JSON.parse(obj)) 
            }
        }
    }
    

    // },
    // { 
    //     hooks:{
    //         afterValidate: function(chats){
    //             chats = chats.sync().then(instance => chats = instance)
    //         }
    //     }
    // }
    )

    // chats.associate = function(models){
    //     chats.belongsTo(models.accounts)
    //     // chats.belongsTo(models.accounts, {foreignKey: 'accountId', as:'accounts'})
    // }



    return chats
}