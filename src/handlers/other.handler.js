'use strict';
const services = require('../services');
const resCode = require('../core/resCode');
module.exports = {
  categoryRecomList: async function (request, h) {
    let type = request.payload.type;
    let recomListBody = await services.category.recomList(type);
    if (resCode.isSuccess(recomListBody)) {
      let recomContentBody = await services.other.recomContent(type);
      if (resCode.isSuccess(recomContentBody)) {
        return resCode.success({
          list: recomListBody.response,
          bannerItems: [],
          content: recomContentBody.response
        })
      } else {
        return recomContentBody;
      }
    } else {
      return recomListBody;
    }
  },
  childCategoryRecomList: async function (request, h) {
    let categoryId = request.payload.categoryId;
    let recomListBody = await services.category.childCategoryRecomList(categoryId);
    if (resCode.isSuccess(recomListBody)) {
      let recomContentBody = await services.other.childRecomContent(categoryId);
      if (resCode.isSuccess(recomContentBody)) {
        return resCode.success({
          list: recomListBody.response,
          bannerItems: [],
          content: recomContentBody.response
        });
      } else {
        return recomContentBody;
      }
    } else {
      return recomListBody;
    }
  }
}
