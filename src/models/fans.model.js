const Sequelize = require('sequelize');
// 粉丝关系表
module.exports = {
  model: {
    table: {
      followedId: {
        type: Sequelize.INTEGER
      },
      fansId: {
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
