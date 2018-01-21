
const Sequelize = require('sequelize');
module.exports = {
  priority: 1,
  model: {
    table: {
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
    options: {
      tableName: 'TAdmin',
      timestamp: false
      // freezeTableName: true
    }
  }
}
