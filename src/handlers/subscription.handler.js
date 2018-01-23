'use strict';
const services = require('../services')
module.exports = {
  add: function (request, h) {
    return services.subscription.add(request.payload.userId, request.payload.targetId);
  },
  remove: function (request, h) {
    return services.subscription.remove(request.payload.userId, request.payload.targetId);
  },
  list: function (request, h) {
    return services.subscription.list(request.payload.userId);
  }
}
