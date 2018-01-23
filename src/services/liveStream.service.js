'use strict';
const models = require('../models');
const resCode = require('../core/resCode');
module.exports = {
  start: async function (categoryId, childCategoryId, account) {
    const category = await models.tables.category.findOne({
      where: {
        id: categoryId
      },
      include: [
        {
          model: models.tables.childCategory,
          where: {
            id: childCategoryId
          }
        }
      ]
    });
    let user = await models.user.findOne({
      where: {
        account: account
      }
    });
    if (category && user) {
      await models.sequelize.transaction();
      let error = await models.tables.liveStream.create({
        account: account,
        categoryId: categoryId,
        childCategoryId: childCategoryId
      });
      if (error) {
        return resCode.dataCreateFailure();
      } else {
        return resCode.success();
      }
    } else {
      return resCode.dataFindFailure();
    }
  },
  cancel: async function (streamId, account) {
    await models.sequelize.transaction();
    let result = await models.tables.liveStream.destroy({
      where: {
        id: streamId,
        account: account
      }
    });
    if (result > 0) {
      return resCode.success();
    } else {
      return resCode.dataDestroyFailure();
    }
  },
  list: async function (childCategoryId) {
    let liveStream = await models.tables.liveStream.findAll({
      where: {
        childCategoryId: childCategoryId
      }
    });
    if (liveStream) {
      return resCode.success(JSON.stringify(liveStream));
    } else {
      return resCode.dataFindFailure();
    }
  }
};
