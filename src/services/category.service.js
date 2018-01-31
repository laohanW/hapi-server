'use strict';
const sequelize = require('../models');
const resCode = require('../core/resCode');
module.exports = {
  add: async function (type, categoryName, desc) {
    const h = await sequelize.sequelize.models.category.findOne({
      where: {
        type: type,
        name: categoryName
      }
    });
    if (h) {
      return resCode.dataFindFailure('type or categorName has');
    } else {
      await sequelize.transaction();
      await sequelize.models.category.create({
        type: type,
        name: categoryName,
        recommended: 0,
        description: desc
      })
      return resCode.success();
    }
  },
  remove: async function (categoryId) {
    await sequelize.transaction();
    await sequelize.models.category.destroy({
      where: {
        id: categoryId
      },
      include: [sequelize.models.childCategory]
    });
    return resCode.success();
  },
  recomList: async function (type) {
    let h = await sequelize.models.category.findAll({
      where: {
        type: type,
        recommended: true
      }
    });
    return resCode.success(h.toJSON());
  },
  setRecom: async function (categoryId, recommended) {
    const error = await sequelize.models.category.update(
      {
        recommended: recommended
      },
      {
        where: {
          id: categoryId
        }
      }
    )
    if (error) {
      return resCode.success();
    } else {
      return resCode.dataUpdateFailure();
    }
  },
  allList: async function (type) {
    let result = await sequelize.models.category.findAll({
      where: {
        type: type
      },
      distinct: true
    });
    if (result && result.length > 0) {
      return resCode.success(result.toJSON());
    } else {
      return resCode.dataFindFailure();
    }
  },
  addChild: async function (categoryId, childCategoryName) {
    let category
    try {
      category = await sequelize.models.category.findOne({
        where: {
          id: categoryId
        },
        include: [
          {
            model: sequelize.models.childCategory,
            where: {
              name: childCategoryName
            }
          }
        ]
      });
    } catch (error) {
      console.log(error)
    }
    if (category && category.length > 0) {
      return resCode.dataFindFailure(' has thiw categoryName' + childCategoryName);
    } else {
      await sequelize.transaction();
      let re = await sequelize.models.childCategory.create({
        categoryId: categoryId,
        name: childCategoryName
      });
      if (re) {
        return resCode.success();
      } else {
        return resCode.dataCreateFailure();
      }
    }
  },
  removeChild: async function (childCategoryId) {
    await sequelize.transaction();
    const result = await sequelize.models.childCategory.destroy({
      where: {
        id: childCategoryId
      }
    });
    if (result > 0) {
      return resCode.success();
    } else {
      return resCode.dataDestroyFailure();
    }
  },
  childRecomList: async function (categoryId) {
    const result = await sequelize.models.childCategory.findAll({
      where: {
        id: categoryId
      }
    });
    if (result && result.length > 0) {
      return resCode.success(result.toJSON());
    } else {
      return resCode.dataFindFailure();
    }
  }
}
