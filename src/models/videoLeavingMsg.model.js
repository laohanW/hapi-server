const Sequelize = require('sequelize');
// 视频留言表
module.exports = {
  model: {
    table: {
      videoId: {
        // 视频id
        type: Sequelize.INTEGER
      },
      userId: {
        // 评论者id
        type: Sequelize.INTEGER
      },
      praiseCount: {
        // 点赞数量
        type: Sequelize.INTEGER
      },
      replyId: {
        // 回复的目标userid
        type: Sequelize.INTEGER
      },
      content: {
        // 内容
        type: Sequelize.STRING
      },
      time: {
        // 留言时间
        type: Sequelize.DATE
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
