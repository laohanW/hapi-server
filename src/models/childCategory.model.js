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
