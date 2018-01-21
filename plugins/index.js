'use strict';
const Config = require('config');
const pkg = require('../package');
const routePlugin = require('./routes.plugin')
module.exports = async (server) => {
  let plugins = [];
  if (Config.get('env') === 'development') {
    plugins = [
      require('inert'),
      require('vision'),
      {
        plugin: require('hapi-swagger'),
        options: {
          info: {
            title: 'Liveplayer API Documentation',
            version: pkg.version,
            contact: {
              name: 'laohan',
              email: '369016334@qq.com'
            }
          },
          schemes: ['http', 'https'],
          host: Config.get('server.info.host') + ':' + Config.get('server.info.port'),
          cors: Config.get('server.info.routes.cors')
        }
      },
      {
        plugin: require('./good'),
        options: {
          // ops: {
          //     interval: 1000
          // },
          reporters: {
            myConsoleReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ],
            myFileReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ ops: '*' }]
              },
              {
                module: 'good-squeeze',
                name: 'SafeJson'
              }
              // {
              //     module: 'good-file',
              //     args: ['./test/fixtures/awesome_log']
              // }
            ],
            myHTTPReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ error: '*' }]
              },
              {
                module: 'good-http',
                args: ['http://prod.logs:3000', {
                  wreck: {
                    headers: { 'x-api-key': 12345 }
                  }
                }]
              }
            ]
          }
        }
      }
    ]
  }
  plugins.push({
    plugin: routePlugin,
    options: {
      includes: ['src/routes/*.route.js']
    }
  })
  await server.register(plugins);
};
