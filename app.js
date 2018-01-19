'use strict';
const Hapi = require('hapi');
const Config = require('config');
const plugins = require('./plugins');
async function start(){
    const connectionConfig = Config.get('server.info');
    const server = new Hapi.Server(JSON.parse(JSON.stringify(connectionConfig)));
    await plugins(server);
    server.start();
    console.log('api server running at:',server.info.uri);
}
start();