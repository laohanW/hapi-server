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
  }
}
