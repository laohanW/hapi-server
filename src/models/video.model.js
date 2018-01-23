const Sequelize = require('sequelize');
// 视频表
module.exports = {
  priority: 6,
  model: {
    table: {
      videoId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      shareCount: {
        type: Sequelize.INTEGER
      },
      leavingMsgId: {
        // 留言表id
        type: Sequelize.INTEGER
      },
      praiseId: {
        // 点赞表id
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
