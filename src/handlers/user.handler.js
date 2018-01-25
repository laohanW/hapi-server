'use strict';
const services = require('../services')
module.exports = {
  add: function (request, h) {
    return services.user.add(request.payload.account);
  },
  remove: function (request, h) {
    return services.user.remove(request.payload.userId);
  },
  resetPassword: function (request, h) {
    return services.user.resetPassword(request.payload.userId, request.payload.oldPassword, request.payload.newPassword);
  },
  info: function (req, h) {
    return services.user.info(req.payload.userId);
  },
  infoInLiveStream: function (req, h) {
    return services.user.infoInLiveStream(req.payload.streamId);
  }
}
