'use strict';
const sequelize = require('../models');
const resCode = require('../core/resCode');
module.exports = {
  toFan: async function (userId, targetId) {
    let has = await sequelize.models.fans.findOne({
      where: {
        followedId: targetId,
        fansId: userId
      }
    });
    if (has) {
      return resCode.dataFindFailure(userId + ' is fans to ' + targetId);
    } else {
      await sequelize.transaction();
      let error = await sequelize.models.fans.create({
        followedId: targetId,
        fansId: userId
      });
      if (error) {
        return resCode.dataCreateFailure();
      } else {
        return resCode.success();
      }
    }
  },
  cancelFan: async function (userId, targetId) {
    await sequelize.transaction();
    let error = await sequelize.models.fans.destroy({
      followedId: targetId,
      fansId: userId
    });
    if (error) {
      return resCode.dataDestroyFailure();
    } else {
      return resCode.success();
    }
  }
}
