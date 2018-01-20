
const Sequelize = require('sequelize');
module.exports ={
    model: {
        table:{
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            name: {
                type: Sequelize.STRING
            }
        },
        options:{
            tableName: 'TAdmin',
            timestamp: false
            // freezeTableName: true
        }
    }
}