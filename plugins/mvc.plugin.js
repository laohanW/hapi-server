import { isObject } from 'util';

'use strict';
const Glob = require('glob');
const Path = require('path');

module.exports = {
    register:async function(server, options) {
        const isArray = Array.isArray || function (arr) {
            return {}.toString.call(arr) === '[object Array]';
        };
        const cast = (value) => {
            return isArray(value) ? value : [value];
        };
        const globtions = {
            nodir: true,
            strict: true,
            ignore: options.ignores && cast(options.ignores) || [],
            cwd: options.relativeTo || process.cwd()
        };
        cast(options.routes).forEach(pattern => {
            const matches = Glob.sync(pattern, globtions);
            if (matches.length === 0) {
                return nextPattern('No handler files found for pattern ' + pattern);
            }
            matches.forEach(match => {
                var route = require(globOptions.cwd + '/' + match)
                const cls=route.default || route;
                if(isArray(cls)){
                    cls.forEach(function(element) {
                        server.route(element)
                    });
                }
                else if(isObject(cls)){
                    server.route(cls);
                }
            });
        });
        cast(options.handlers).forEach(pattern => {
            const matches = Glob.sync(pattern, globtions);
            if (matches.length === 0) {
                return nextPattern('No handler files found for pattern ' + pattern);
            }
            matches.forEach(match => {
                const load = require(globtions.cwd + '/' + match);
                if(!server.handler)
                {
                    server.handler={};
                }
                const conHandlerName=Path.basename(match, Path.extname(match));
                const handlerName=Path.basename(conHandlerName, Path.extname(conHandlerName));
                const cls=load.default || load;
                server.handler[handlerName]= cls;
            });
        });
        cast(options.services).forEach(pattern => {
            const matches = Glob.sync(pattern, globtions);
            if (matches.length === 0) {
                return nextPattern('No handler files found for pattern ' + pattern);
            }
            matches.forEach(match => {
                const load = require(globtions.cwd + '/' + match);
                if(!server.service)
                {
                    server.service={};
                }
                const conHandlerName=Path.basename(match, Path.extname(match));
                const handlerName=Path.basename(conHandlerName, Path.extname(conHandlerName));
                const cls=load.default || load;
                if(isObject(cls)){
                    cls.server=server;
                    server.service[handlerName]= cls;
                }
                else {
                    throw new Error('service export must object');
                }
            });
        });
        cast(options.models).forEach(pattern => {
            const matches = Glob.sync(pattern, globtions);
            if (matches.length === 0) {
                return nextPattern('No handler files found for pattern ' + pattern);
            }
            matches.forEach(match => {
                const load = require(globtions.cwd + '/' + match);
                if(!server.model)
                {
                    server.model={};
                }
                const conHandlerName=Path.basename(match, Path.extname(match));
                const handlerName=Path.basename(conHandlerName, Path.extname(conHandlerName));
                const cls=load.default || load;
                if(isObject(cls)){
                    cls.server=server;
                    server.model[handlerName]= cls;
                }
                else {
                    throw new Error('service export must object');
                }
            });
        });
    },
    pkg:require('../package.json'),
    name:'handlerPlugin',
    versopm:'1.0.0'
}