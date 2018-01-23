'use strict';
const models = require('../models');
const resCode = require('../core/resCode');
module.exports = {
  add: async function (userId, targetId) {
    let has = await models.tables.subscription.findOne({
      where: {
        followedId: targetId,
        subscriberId: userId
      }
    });
    if (has) {
      return resCode.dataFindFailure(userId + ' subscribered target ' + targetId);
    } else {
      await models.sequelize.transaction();
      let err = await models.tables.subscription.create({
        followedId: targetId,
        subscriberId: userId
      });
      if (err) {
        return resCode.dataCreateFailure();
      } else {
        return resCode.success();
      }
    }
  },
  remove: async function (userId, targetId) {
    await models.sequelize.transaction();
    let has = await models.tables.subscription.destroy({
      where: {
        followedId: targetId,
        subscriberId: userId
      }
    });
    if (has > 0) {
      return resCode.success();
    } else {
      return resCode.dataDestroyFailure();
    }
  },
  list: async function (userId) {
    let subscription = await models.tables.subscription.findAll({
      where: {
        followedId: userId
      }
    });
    if (subscription) {
      return resCode.success(JSON.stringify(subscription));
    } else {
      return resCode.dataFindFailure();
    }
  }
}
