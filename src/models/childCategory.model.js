const Sequelize = require('sequelize');
module.exports = {
  priority: 4,
  model: {
    table: {
      name: {
        type: Sequelize.STRING
      }
    },
    options: {
      tableName: 'TChildCategory',
      timestamp: false,
      associate: function (models) {
        console.log('wwwwwww');
      }
      // freezeTableName: true
    }
  },
  associate: {
    type: 'hasMany',
    to: 'liveStream',
    options: {
      as: 'TLiveStream',
      foreignKey: 'categoryId'
    }
  }
}
