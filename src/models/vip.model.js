const Sequelize = require('sequelize');
// vip贵族表
module.exports = {
  model: {
    table: {
      type: {
        // 视频id
        type: Sequelize.INTEGER
      },
      imageUrl: {
        // 图像
        type: Sequelize.INTEGER
      },
      miniIcon: {
        // 图标头像
        type: Sequelize.INTEGER
      },
      monery: {
        // 价值（）钱
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
