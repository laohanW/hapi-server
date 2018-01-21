'use strict';
var services = require('../services');
module.exports = {
  add: async function (request, h) {
    return await services.category.add(request.payload.type, request.payload.categoryName, request.payload.desc);
  },
  remove: async function (req, h) {
    return await services.category.remove(req.payload.categoryId);
  },
  recomList: async function (req, h) {
    return await services.category.recomList(req.payload.type);
  },
  allList: async function (req, h) {
    return await services.category.allList(req.payload.type);
  },
  setRecom: async function (req, h) {
    return await services.category.setRecom(req.payload.categoryId, req.payload.recommended)
  },
  addChild: async function (req, h) {
    return await services.category.addChild(req.payload.categoryId, req.payload.childCategoryName);
  },
  removeChild: async function (req, h) {
    return await services.category.removeChild(req.payload.childCategoryId);
  },
  childRecomList: async function (req, h) {
    return await services.category.childRecomList(req.payload.categoryId);
  }
};
