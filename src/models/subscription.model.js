const Sequelize = require('sequelize');
module.exports = {
  model: {
    table: {
      followedId: {
        type: Sequelize.INTEGER
      },
      subscriberId: {
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
