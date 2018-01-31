'use strict';
const sequelize = require('../models');
const resCode = require('../core/resCode');
const utils = require('../core/utils');
module.exports = {
  add: async function (account, password, name) {
    await sequelize.transaction({autocommit: true});
    let userId = utils.caculateUserId();
    let err = await sequelize.models.user.findCreateFind({
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
    await sequelize.transaction({autocommit: true});
    let error = await sequelize.models.user.destroy({
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
    let result = await sequelize.models.user.findOne({
      where: {
        userId: userId
      }
    });
    if (result) {
      let pas = result.get('password');
      if (pas === oldPasswprd) {
        await sequelize.transaction({autocommit: true});
        let err = await sequelize.models.user.update({
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
    let userInfo = await sequelize.models.user.findOne({
      where: {
        userId: userId
      }
    });
    if (userInfo) {
      return resCode.success(userInfo.toJSON());
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
    await sequelize.models.fans.findAll({
      attributes: [
        [sequelize.literal('distinct ``'), '']
      ],
      where: {
        userId: userId
      }

    });
  }
}
