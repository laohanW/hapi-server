'use strict';
const sequelize = require('../models');
const resCode = require('../core/resCode');
module.exports = {
  add: async function (userId, targetId) {
    let has = await sequelize.models.subscription.findOne({
      where: {
        followedId: targetId,
        subscriberId: userId
      }
    });
    if (has) {
      return resCode.dataFindFailure(userId + ' subscribered target ' + targetId);
    } else {
      await sequelize.transaction();
      let err = await sequelize.models.subscription.create({
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
    await sequelize.transaction();
    let has = await sequelize.models.subscription.destroy({
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
    let subscription = await sequelize.models.subscription.findAll({
      where: {
        followedId: userId
      }
    });
    if (subscription) {
      return resCode.success(subscription.toJSON());
    } else {
      return resCode.dataFindFailure();
    }
  }
}
