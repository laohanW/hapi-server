const Sequelize = require('sequelize');
module.exports = {
  priority: 6,
  model: {
    table: {
      followedId: {
        type: Sequelize.INTEGER
      },
      fansId: {
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
