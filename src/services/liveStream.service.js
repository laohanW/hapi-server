'use strict';
const sequelize = require('../models');
const resCode = require('../core/resCode');
const Op = require('sequelize').Op;
module.exports = {
  start: async function (categoryId, childCategoryId, account) {
    const category = await sequelize.models.category.findOne({
      where: {
        id: categoryId
      },
      include: [
        {
          model: sequelize.models.childCategory,
          where: {
            id: childCategoryId
          }
        }
      ]
    });
    let user = await sequelize.models.user.findOne({
      where: {
        account: account
      }
    });
    if (category && user) {
      await sequelize.transaction();
      let error = await sequelize.models.liveStream.create({
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
    await sequelize.transaction();
    let result = await sequelize.models.liveStream.destroy({
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
    let liveStream = await sequelize.models.liveStream.findAll({
      where: {
        childCategoryId: childCategoryId
      }
    });
    if (liveStream) {
      return resCode.success(liveStream.toJSON());
    } else {
      return resCode.dataFindFailure();
    }
  },
  userInfo: async function (streamId) {
    let stream = await sequelize.models.liveStream.findOne({
      where: {
        streamId: streamId
      },
      include: [
        {
          model: sequelize.models.user,
          include: [
            {
              model: sequelize.models.video,
              include: [
                {
                  model: sequelize.models.videoLeavingMsg
                }
              ],
              order: ['createTime', 'DESC'],
              limit: 1
            }
          ]
        }
      ]
    });
    if (stream) {
      console.log(stream);
      let relateVideo = await sequelize.models.video.findAll({
        where: {
          title: {
            [Op.like]: stream.title
          }
        },
        limit: 10
      })
      return resCode.success({
        title: stream.title,
        headPortraitUrl: stream.users.headPortraitUrl,
        createTime: stream.users.video.createTime,
        relateVideo: relateVideo
      });
    } else {
      return resCode.dataFindFailure('dont has this video=>' + stream.userId);
    }
  }
};
