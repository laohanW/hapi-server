const Sequelize = require('sequelize');
// 贡品表
module.exports = {
  priority: 6,
  model: {
    table: {
      tyoe: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      imazamoxCount: {
        // 金豆数
        type: Sequelize.INTEGER
      },
      silverBeansCount: {
        // 银豆数
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
