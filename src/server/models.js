
module.exports = (sequelize, Sequelize) => {
    // to do: use hooks to convert password to a hash
    return sequelize.define("accounts", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            // allowNull: false
            // default: sequelize.fn('uuid_generate_v4')
            // defaultValue:1,
            autoIncrement: true
        },
        username:{
            type: Sequelize.STRING,
            allowNull:false   
        },
        password:{
            type: Sequelize.STRING,
            allowNull:false
        },
        token:{
            type: Sequelize.BOOLEAN,
            // values: ['true', 'false'],
            allowNull:false

        }

    })
}