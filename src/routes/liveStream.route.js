'use strict';
const Joi = require('joi');
const handlers = require('../handlers')

module.exports = [
  {
    method: 'POST',
    path: '/liveStream/start',
    config: {
      handlers: handlers.liveStrean.start,
      plugins: {
        'hapi-swagger': {
          responses: {
            '404': {
              description: 'type or categoryName dont found',
              schema: Joi.object({
                code: Joi.number(),
                error: Joi.string(),
                message: Joi.string()
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
          categoryId: Joi.number().integer().required().description('categoryId'),
          childCategoryId: Joi.integer().required().description('childCategoryId'),
          account: Joi.string().required().description('account')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/liveStream/cancel',
    config: {
      handlers: handlers.liveStrean.cancel,
      plugins: {
        'hapi-swagger': {
          responses: {
            '404': {
              description: 'type or categoryName dont found',
              schema: Joi.object({
                code: Joi.number(),
                error: Joi.string(),
                message: Joi.string()
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
          streamId: Joi.number().integer().required().description('streamId'),
          account: Joi.string().required().description('account')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/liveStream/join',
    config: {
      handlers: handlers.liveStrean.join,
      plugins: {
        'hapi-swagger': {
          responses: {
            '404': {
              description: 'type or categoryName dont found',
              schema: Joi.object({
                code: Joi.number(),
                error: Joi.string(),
                message: Joi.string()
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
          streamId: Joi.number().integer().required().description('streamId'),
          account: Joi.string().required().description('account')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/liveStream/list',
    config: {
      handlers: handlers.liveStrean.list,
      plugins: {
        'hapi-swagger': {
          responses: {
            '404': {
              description: 'type or categoryName dont found',
              schema: Joi.object({
                code: Joi.number(),
                error: Joi.string(),
                message: Joi.string()
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
          childCategoryId: Joi.number().integer().required().description('childCategoryId')
        }
      }
    }
  }
]
