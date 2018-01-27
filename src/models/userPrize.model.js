const Sequelize = require('sequelize');
// 用户奖品表
module.exports = {
  model: {
    table: {
      userId: {
        type: Sequelize.INTEGER
      },
      prizeId: {
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
