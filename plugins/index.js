'use strict';
const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Config = require('config');
const pkg = require('../package');
const routePlugin = require('./routes.plugin')
module.exports=async (server)=>{
    let plugins = [];
    if(Config.get('env') === 'development'){
        plugins=[
           Inert,
           Vision,
           {
               plugin: HapiSwagger,
               options:{
                   info:{
                       title: 'Liveplayer API Documentation',
                       version: pkg.version,
                       contact: {
                           name: 'laohan',
                           email: '369016334@qq.com'
                       }
                   },
                   schemes: ['http','https'],
                   host: 'www.baidu.com',
                   cors: true
               }
           }
        ]
    }
    plugins.push({
        plugin:routePlugin,
        options:{
            includes:['src/routes/*.route.js']
        }
    })
    await server.register(plugins);
};