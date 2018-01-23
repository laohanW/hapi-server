'use strict';
const models = require('../models');
const resCode = require('../core/resCode');
module.exports = {
  toFan: async function (userId, targetId) {
    let has = await models.tables.fans.findOne({
      where: {
        followedId: targetId,
        fansId: userId
      }
    });
    if (has) {
      return resCode.dataFindFailure(userId + ' is fans to ' + targetId);
    } else {
      await models.sequelize.transaction();
      let error = await models.tables.fans.create({
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
    await models.sequelize.transaction();
    let error = await models.tables.fans.destroy({
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
