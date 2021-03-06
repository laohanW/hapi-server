'use strict';

// Load Modules

const Joi = require('joi');

exports.monitor = Joi.object().keys({
  includes: Joi.object().keys({
    request: Joi.array().items(Joi.string().valid('headers', 'payload')).default([]),
    response: Joi.array().items(Joi.string().valid('payload')).default([])
  }).default({
    request: [],
    response: []
  }),
  reporters: Joi.object().pattern(/./, Joi.array().items(
    Joi.object().keys({
      pipe: Joi.func().required(),
      start: Joi.func()
    }).unknown(),
    Joi.string().valid('stdout', 'stderr'),
    Joi.object().keys({
      module: Joi.alternatives().try(Joi.string(), Joi.func()).required(),
      name: Joi.string(),
      args: Joi.array().default([])
    })
  )).default({}),
  extensions: Joi.array().items(Joi.string().invalid('log', 'ops', 'request', 'response')).default([]),
  ops: Joi.alternatives([Joi.object(), Joi.bool().allow(false)]).default({
    config: {},
    interval: 15000
  })
}).unknown(false);
