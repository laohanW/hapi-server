const Sequelize = require('sequelize');
module.exports = {
    priority: 2,
    model: {
        table: {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            account: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            }
        },
        options:{
            tableName: 'TUser',
            timestamp: false
            // freezeTableName: true
        }
    }
}