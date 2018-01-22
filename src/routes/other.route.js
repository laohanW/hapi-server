'use strict';
const Joi = require('joi');
const handlers = require('../handlers')
module.exports = [
  {
    method: 'POST',
    path: '/other/categoryRecomList',
    config: {
      handler: handlers.other.categoryRecomList,
      plugins: {
        'hapi-swagger': {
          responses: {
            '400': {
              description: 'BadRequest',
              schema: Joi.object({
                equals: Joi.number()
              }).label('Result')
            }
          },
          payloadType: 'json'
        }
      },
      description: 'Get',
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          type: Joi.number()
            .required()
            .description('the id for the todo item')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/other/childCategoryRecomList',
    config: {
      handler: handlers.other.childCategoryRecomList,
      plugins: {
        'hapi-swagger': {
          responses: {
            '400': {
              description: 'BadRequest',
              schema: Joi.object({
                equals: Joi.number()
              }).label('Result')
            }
          },
          payloadType: 'json'
        }
      },
      description: 'Get',
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          categoryId: Joi.number()
            .required()
            .description('the id for the todo item')
        }
      }
    }
  }
]
