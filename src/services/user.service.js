'use strict';
const models = require('../models');
const Op = require('sequelize').Op;
const resCode = require('../core/resCode');
const utils = require('../core/utils');
module.exports = {
  add: async function (account, password, name) {
    await models.sequelize.transaction();
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
  infoInLiveStream: async function (streamId) {
    let stream = await models.tables.liveStream.findOne({
      where: {
        streamId: streamId
      },
      include: [
        {
          model: models.tables.user,
          include: [
            {
              model: models.tables.video,
              include: [
                {
                  model: models.tables.videoLeavingMsg
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
      let relateVideo = await models.tables.video.findAll({
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
}
