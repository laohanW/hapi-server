const Sequelize = require('sequelize');
module.exports = {
    model: {
        table: {
            type: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            recommended: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1
                }
            },
            description: {
                type: Sequelize.STRING
            }
        },
        options: {
            tableName: 'TCategory',
            timestamp: false
            // freezeTableName: true
        }
    },
    associate:{
        type: 'hasMany',
        to:'childCategory'
    }
}