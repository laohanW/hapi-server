const Sequelize = require('sequelize');
module.exports = {
    model:{
        table:{
            name: {
              type: Sequelize.STRING
            }
        },
        options:{
            tableName: 'TChildCategory',
            timestamp: false
            // freezeTableName: true
        }
    },
    associate:{
        type: 'hasMany',
        to:'liveStream',
        options:{
            
        }
    }
}
