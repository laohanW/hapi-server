'use strict';
const models = require('../models');
const resCode = require('../core/resCode');
const utils = require('../core/utils');
module.exports = {
  add: async function (account, password, name) {
    let result = await models.tables.user.findOne({
      where: {
        account: account
      }
    });
    if (result) {
      return resCode.dataFindFailure('has this account = ' + account);
    } else {
      await models.sequelize.transaction();
      let userId = utils.caculateUserId();
      let err = await models.tables.user.create({
        account: account,
        userId: userId,
        password: password,
        name: name
      });
      if (err) {
        return resCode.dataCreateFailure();
      } else {
        return resCode.success(userId);
      }
    }
  },
  remove: async function (userId) {
    let result = await models.tables.user.findOne({
      where: {
        userId: userId
      }
    });
    if (result) {
      await models.sequelize.transaction();
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
    } else {
      return resCode.dataFindFailure();
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
        await models.sequelize.transaction();
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
  }
}
