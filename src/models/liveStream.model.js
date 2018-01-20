const Sequelize = require('sequelize');
module.exports = {
    model:{
        table:{
            account: {
                type: Sequelize.STRING
            }
        },
        options:{
            tableName: 'TLiveStream',
            timestamp: false
        }
    }
}