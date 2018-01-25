const Sequelize = require('sequelize');
// 视频点赞表
module.exports = {
  priority: 6,
  model: {
    table: {
      videoId: {
        // 视频id
        type: Sequelize.INTEGER
      },
      userId: {
        // 点赞者id
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
