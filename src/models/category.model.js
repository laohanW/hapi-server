'use strict';
const Sequelize = require('sequelize');
module.exports = {
  priority: 5,
  model: {
    table: {
      type: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      recommended: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 1
        }
      },
      description: {
        type: Sequelize.STRING
      }
    },
    options: {
      timestamp: false
      // freezeTableName: true
    }
  },
  associate: {
    type: 'hasMany',
    to: 'childCategory',
    options: {
      foreignKey: 'childCategoryId'
    }
  }
}
