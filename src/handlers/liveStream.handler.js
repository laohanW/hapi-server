'use strict';
var services = require('../services');
module.exports = {
  start: async function (request, h) {
    return await services.liveStream.start(request.payload.categoryId, request.payload.childCategoryId, request.payload.account);
  },
  cancel: async function (request, h) {
    return await services.liveStream.cancel(request.payload.streamId, request.payload.account);
  },
  join: async function (request, h) {
    return await services.liveStream.join();
  },
  list: async function (request, h) {
    return await services.liveStream.list(request.payload.childCategoryId);
  }
}
