'use strict';
const Joi = require('joi');
const handlers = require('../handlers');
module.exports = [
  {
    method: 'POST',
    path: '/fans/tofan',
    config: {
      handler: handlers.fans.toFan,
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
      description: 'userId成为targetId的粉丝',
      notes: 'userId成为targetId的粉丝',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          userId: Joi.number().required().description('userid申请变成粉丝 '),
          targetId: Joi.number().required().description('成为target的粉丝')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/fans/cancelfan',
    config: {
      handler: handlers.fans.cancelFan,
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
      description: 'userId取消成为targetId的粉丝',
      notes: 'userId取消成为targetId的粉丝',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          userId: Joi.number().required().description('userid申请取消粉丝 '),
          targetId: Joi.number().required().description('取消成为target的粉丝')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/fans/list',
    config: {
      handler: handlers.fans.list,
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
      description: '被关注者的粉丝列表',
      notes: '粉丝列表',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          userId: Joi.number().required().description('被关注者的userid ')
        }
      }
    }
  }
]
