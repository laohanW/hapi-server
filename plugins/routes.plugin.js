'use strict'

var glob = require('glob')

exports.plugin = {
  register:async function(server, options) {
        const isArray = Array.isArray || function (arr) {
            return {}.toString.call(arr) === '[object Array]';
        };
        const isObject = function(obj){
            return Object.prototype.toString.call(obj) === '[object Object]';
        }
        const cast = (value) => {
            return isArray(value) ? value : [value];
        };
        var globOptions = {
            nodir: true,
            strict: true,
            cwd: options.cwd || process.cwd(),
            ignore: options.ignore
        }
        cast(options.includes).forEach(pattern =>{
            var files = glob.sync(pattern, globOptions)
            files.forEach(function(match, nextMatch){
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
        })
    },
    name:'route-plugins'
}