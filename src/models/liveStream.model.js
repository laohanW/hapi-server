const Sequelize = require('sequelize');
module.exports = {
  priority: 3,
  model: {
    table: {
      account: {
        type: Sequelize.STRING
      }
    },
    options: {
      timestamp: false
    }
  }
}
