const Sequelize = require('sequelize');
// 奖品
module.exports = {
  model: {
    table: {
      prizeId: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
