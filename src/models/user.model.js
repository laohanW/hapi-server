const Sequelize = require('sequelize');
module.exports = {
  priority: 2,
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      account: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.INTEGER
      },
      age: {
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.INTEGER
      },
      autgoraph: {
        type: Sequelize.STRING// 签名
      },
      level: {
        type: Sequelize.INTEGER
      },
      imazamox: {
        type: Sequelize.INTEGER// 金豆
      },
      silverBeans: {
        type: Sequelize.INTEGER// 银豆
      },
      imazamoxCoupon: {
        type: Sequelize.INTEGER// 金豆卷
      },
      yCurrency: {
        tyoe: Sequelize.INTEGER// Y币
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  }
}
