const Sequelize = require('sequelize');
module.exports = {
  model: {
    table: {
      liveStreamId: {
        type: Sequelize.INTEGER,
        primary: true
      },
      userId: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      childCategoryId: {
        type: Sequelize.INTEGER
      },
      roomId: {
        type: Sequelize.INTEGER
      },
      rtmp: {
        type: Sequelize.STRING
      },
      snapshotUrl: {
        type: Sequelize.STRING
      },
      startTime: {
        type: Sequelize.DATE
      }
    },
    options: {
      timestamp: false
    }
  },
  associate: [
    {
      type: 'hasOne',
      to: 'user',
      options: {
        foreignKey: {
          name: 'userId'
        }
      }
    }
  ]
}
