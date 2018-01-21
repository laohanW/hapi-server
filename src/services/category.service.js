'use strict';
const models = require('../models');
const resCode = require('../core/resCode');
module.exports = {
    add: async  function(type, categoryName, desc){
        const h = await models.tables.category.findOne({
            where: {
                type: type,
                name: categoryName
            }
        });
        if (h) {
            return resCode.dataFindFailure('type or categorName has');
        } else {
            const t = await models.sequelize.transaction();
            const result = await models.tables.category.create({
                type: type,
                name: categoryName,
                recommended:0,
                description:desc
            })
            return resCode.success();
        }
    },
    remove: async function(categoryId){
        let trans = await models.sequelize.transaction();
        let h = await models.tables.category.destroy({
            where: {
                id: categoryId
            },
            include: [models.tables.childCategory]
        });
        return resCode.success();
    },
    recomList: async function(type) {
        let h = await models.tables.category.findAll({
            where: {
                type: type,
                recommended: true
            }
        });
        return resCode.success(JSON.stringify(h));
    },
    setRecom: async function(categoryId, recommended){
        const error = await models.tables.category.update(
            {
                recommended: recommended
            },
            {
                where: {
                    id: categoryId
                }
            }
        )
        if( error ){
            return resCode.success();
        } else {
            return resCode.dataUpdateFailure();
        }
    },
    allList: async function(type){
        let result = await models.tables.category.findAll({
            where: {
                type: type
            },
            distinct: true
        });
        if(result && result.length > 0){
            return resCode.success(JSON.stringify(result));
        } else {
            return resCode.dataFindFailure();
        }
    },
    addChild:async function(categoryId, childCategoryName){
        console.log('addChild');
        let category = await models.tables.category.findOne({
            where: {
                id: categoryId
            },
            include:[
                {
                    model: models.tables.childCategory,
                    where: {
                        name:childCategoryName
                    }
                }
            ]
        });
        console.log('category');
        console.log(category);
        if (category && category.length >0 ) {
            const trans = await models.sequelize.transaction();
            let re = await models.tables.childCategory.create({
                categoryId: categoryId,
                name: childCategoryName
            });
            if (re) {
                return resCode.success();
            } else {
                return resCode.dataCreateFailure();
            }
        } else {
            return resCode.dataFindFailure('dont has categoryId');
        }
    },
    removeChild: async function(childCategoryId) {
        const trans = await models.sequelize.transaction();
        const result = await models.childCategory.destroy({
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
    childRecomList: async function(categoryId){
        const result = await models.tables.childCategory.findAll({
            where: {
                categoryId: categoryId
            }
        });
        if (result && result.length > 0){
            return resCode.success(JSON.stringify(result));
        } else {
            return resCode.dataFindFailure();
        }
    }
}