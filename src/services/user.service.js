'use strict';
const models = require('../models');
const resCode = require('../core/resCode');
const utils = require('../core/utils');
module.exports = {
  add: async function (account, password, name) {
    await models.sequelize.transaction({autocommit: true});
    let userId = utils.caculateUserId();
    let err = await models.tables.user.findCreateFind({
      where: {
        account: account
      },
      defaults: {
        account: account,
        userId: userId,
        password: password,
        name: name
      }
    });
    if (err) {
      return resCode.dataCreateFailure();
    } else {
      return resCode.success(userId);
    }
  },
  remove: async function (userId) {
    await models.sequelize.transaction({autocommit: true});
    let error = await models.tables.user.destroy({
      where: {
        userId: userId
      }
    });
    if (error) {
      return resCode.dataDestroyFailure();
    } else {
      return resCode.success();
    }
  },
  resetPassword: async function (userId, oldPasswprd, newPassword) {
    let result = await models.tables.user.findOne({
      where: {
        userId: userId
      }
    });
    if (result) {
      let pas = result.get('password');
      if (pas === oldPasswprd) {
        await models.sequelize.transaction({autocommit: true});
        let err = await models.tables.user.update({
          password: newPassword
        },
        {
          where: {
            userId: userId
          }
        });
        if (err) {
          return resCode.dataUpdateFailure();
        } else {
          return resCode.success();
        }
      } else {
        return resCode.dataFindFailure();
      }
    } else {
      return resCode.dataFindFailure();
    }
  },
  info: async function (userId) {
    let userInfo = await models.user.findOne({
      where: {
        userId: userId
      }
    });
    if (userInfo) {
      return resCode.success(JSON.stringify(userInfo));
    } else {
      return resCode.dataFindFailure('dont has this userId=>' + userId);
    }
  },
  detailPayment: async function (userId) {
    let userInfo = await models.userPayment.findAll({
      where: {
        userId: userId
      }
    });
    if (userInfo) {
      return resCode.success(JSON.stringify(userInfo));
    } else {
      return resCode.dataFindFailure('dont has this userId=>' + userId);
    }
  },
  weekLeaderboards: async function (userId) {
    let result = await models.tables.fans.findAll({
      attributes: [
        [models.sequelize.literal('distinct ``'), '']
      ],
      where: {
        userId: userId
      }

    });
  }
}
