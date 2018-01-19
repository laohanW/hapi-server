'use strict';
const Good = require('good');
const handlerPlugin = require('./handlers.plugin');
const routePlugin = require('./routes.plugin')
module.exports=async (server)=>{
    await server.register([
        {
            plugin:handlerPlugin,
            options:{
                includes:['src/handlers/*.handler.js']
            }
        },
        {
            plugin:routePlugin,
            options:{
                includes:['src/routes/*.route.js']
            }
        }
    ]);
};