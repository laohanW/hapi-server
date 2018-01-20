'use strict';
const Joi = require('joi');
const handlers = require('../handlers')

module.exports = [
    {
        method: 'GET',
        path: '/category/add/{id}',
        config: {
            handler: handlers.category.add,
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '400':{
                            description: 'BadRequest,'
                        }
                    },
                    payloadType: 'json,',
                    deprecated: true
                }
            },
            description: 'Get',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                params: {
                    id : Joi.number()
                            .required()
                            .description('the id for the todo item'),
                }
            }
        }
    }
]