const Sequelize = require('sequelize');
module.exports = {
  priority: 2,
  model: {
    table: {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      account: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      headPortraitUrl: {
        // 头像
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
        // 城市
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
        type: Sequelize.INTEGER// Y币
      },
      vipType: {
        // vip类型，是否是贵宾
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  },
  associate: [
    {
      type: 'hasMany',
      to: 'userPayment',
      options: {
        foreignKey: {
          name: 'userId'
        }
      }
    },
    {
      type: 'hanMany',
      to: 'userPrize',
      options: {
        foreignKey: {
          name: 'userId'
        }
      }
    },
    {
      type: 'hanMany',
      to: 'userVideo',
      options: {
        foreignKey: {
          name: 'userId'
        }
      }
    }
  ]
}
