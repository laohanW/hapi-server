const Sequelize = require('sequelize');
module.exports = {
  model: {
    table: {
      name: {
        type: Sequelize.STRING
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  },
  associate: {
    type: 'hasMany',
    to: 'liveStream',
    options: {
      foreignKey: 'childCategoryId'
    }
  }
}
