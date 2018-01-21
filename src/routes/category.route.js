'use strict';
const Joi = require('joi');
const handlers = require('../handlers')

module.exports = [
    {
        method: 'POST',
        path: '/category/add',
        config: {
            handler:  handlers.category.add,
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '404':{
                            description: 'type or categoryName dont found',
                            schema: Joi.object({
                                        code: Joi.number(),
                                        error:Joi.string(),
                                        message:Joi.string()
                                    }).label('Result')
                        }
                    },
                    payloadType: 'json',
                }
            },
            description: 'Get',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    type : Joi.number().integer().required().description('the type for the todo item'),
                    categoryName: Joi.string().required().description('category name'),
                    desc: Joi.required().description('description')
                }
            }
        }
    },
    {
        method: 'POST',
        path:'/category/remove',
        config:{
            handler: handlers.category.remove,
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '404':{
                            description: 'BadRequest',
                            schema: Joi.object({
                                        equals: Joi.number(),
                                    }).label('Result')
                        }
                    },
                    payloadType: 'json',
                }
            },
            description: 'Get',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    categoryId : Joi.number().integer().required().description('the type for the todo item')
                }
            }
        }
    },
    {
        method: 'POST',
        path:'/category/recomList',
        config:{
            handler: handlers.category.recomList,
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '400':{
                            description: 'BadRequest',
                            schema: Joi.object({
                                        equals: Joi.number(),
                                    }).label('Result')
                        }
                    },
                    payloadType: 'json',
                }
            },
            description: 'Get',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    type : Joi.number().integer().required().description('the type for the todo item')
                }
            }
        }
    },
    {
        method: 'POST',
        path:'/category/allList',
        config:{
            handler: handlers.category.allList,
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '400':{
                            description: 'BadRequest',
                            schema: Joi.object({
                                        equals: Joi.number(),
                                    }).label('Result')
                        }
                    },
                    payloadType: 'json',
                }
            },
            description: 'Get',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    type : Joi.number().integer().required().description('the type for the todo item')
                }
            }
        }
    },
    {
        method: 'POST',
        path:'/category/setRecom',
        config:{
            handler: handlers.category.setRecom,
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '400':{
                            description: 'BadRequest',
                            schema: Joi.object({
                                        equals: Joi.number(),
                                    }).label('Result')
                        }
                    },
                    payloadType: 'json',
                }
            },
            description: 'Get',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    categoryId : Joi.number().integer().required().description('the type for the todo item'),
                    recommended:Joi.boolean().required().description('是否是推荐的类型')
                }
            }
        }
    },
    {
        method: 'POST',
        path:'/category/addChild',
        config:{
            handler: handlers.category.addChild,
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '400':{
                            description: 'BadRequest',
                            schema: Joi.object({
                                        equals: Joi.number(),
                                    }).label('Result')
                        }
                    },
                    payloadType: 'json',
                }
            },
            description: 'Get',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    categoryId : Joi.number().integer().required().description('the type for the todo item'),
                    childCategoryName:Joi.string().required().description('子分类的名字')
                }
            }
        }
    },
    {
        method: 'POST',
        path:'/category/removeChild',
        config:{
            handler: handlers.category.removeChild,
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '400':{
                            description: 'BadRequest',
                            schema: Joi.object({
                                        equals: Joi.number(),
                                    }).label('Result')
                        }
                    },
                    payloadType: 'json',
                }
            },
            description: 'Get',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    categoryId : Joi.number().integer().required().description('the type for the todo item')
                }
            }
        }
    },
    {
        method: 'POST',
        path:'/category/childRecomList',
        config:{
            handler: handlers.category.childRecomList,
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '400':{
                            description: 'BadRequest',
                            schema: Joi.object({
                                        equals: Joi.number(),
                                    }).label('Result')
                        }
                    },
                    payloadType: 'json',
                }
            },
            description: 'Get',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    categoryId : Joi.number().integer().required().description('the type for the todo item')
                }
            }
        }
    }
]