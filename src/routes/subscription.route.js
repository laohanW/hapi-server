'use strict';
const Joi = require('joi');
module.exports = [
  {
    method: 'POST',
    path: '/subscription/add',
    config: {
      handler: (req, h) => {
        return 'test success';
      },
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
          account: Joi.number()
            .required()
            .description('the id for the todo item')
        }
      }
    }
  }
]
