const Sequelize = require('sequelize');
// 用户支付明细
module.exports = {
  priority: 3,
  model: {
    table: {
      userId: {
        type: Sequelize.STRING
      },
      money: {
        type: Sequelize.INTEGER
      },
      type: {
        // 1:支付   2:收入
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
    }
  }
}
