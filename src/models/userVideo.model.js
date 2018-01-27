const Sequelize = require('sequelize');
// 用户视频表
module.exports = {
  model: {
    table: {
      userId: {
        type: Sequelize.INTEGER
      },
      videoId: {
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
