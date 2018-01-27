const Sequelize = require('sequelize');
// 粉丝送礼品表
module.exports = {
  model: {
    table: {
      fansId: {
        type: Sequelize.INTEGER
      },
      followedId: {
        type: Sequelize.INTEGER
      },
      giftType: {
        type: Sequelize.INTEGER
      },
      giftCount: {
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
