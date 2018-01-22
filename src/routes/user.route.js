'use strict';
const Joi = require('joi');
const handlers = require('../handlers')
module.exports = [
  {
    method: 'POST',
    path: '/user/add',
    config: {
      handler: handlers.user.add,
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
          account: Joi.string().required().description('the id for the todo item'),
          password: Joi.string().required().description('password'),
          name: Joi.string().required().description('name')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/user/remove',
    config: {
      handler: handlers.user.remove,
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
          account: Joi.string().required().description('the id for the todo item')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/user/resetPassword',
    config: {
      handler: handlers.user.resetPassword,
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
          account: Joi.string().required().description('the id for the todo item'),
          oldPassword: Joi.string().required().description('old password'),
          newPassword: Joi.string().required().description('new password')
        }
      }
    }
  }
]
