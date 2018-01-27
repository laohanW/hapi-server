'use strict';
const Glob = require('glob');
const Path = require('path');
const Sequelize = require('sequelize');
const Config = require('config');
const LocalStorage = require('continuation-local-storage');
const namespace = LocalStorage.createNamespace('my-ver-own-namespace');

const pattern = './*.model.js';
let internals = {};
let tables = {};
const globtions = {
  nodir: true,
  strict: true,
  ignore: [],
  cwd: Path.dirname(__filename)
}
const isArray = Array.isArray || function (arr) {
  return {}.toString.call(arr) === '[object Array]';
};
// const isObject = function (obj) {
//   return Object.prototype.toString.call(obj) === '[object Object]';
// }
const cast = (value) => {
  return isArray(value) ? value : [value];
};
const matches = Glob.sync(pattern, globtions);
matches.forEach(match => {
  const load = require(globtions.cwd + '/' + match);
  const conHandlerName = Path.basename(match, Path.extname(match));
  const handlerName = Path.basename(conHandlerName, Path.extname(conHandlerName));
  const cls = load.default || load;
  tables[handlerName] = cls;
});
Sequelize.useCLS(namespace);
const sequelize = new Sequelize(
  Config.get('db.database'),
  Config.get('db.username'),
  Config.get('db.password'),
  JSON.parse(JSON.stringify(Config.get('db'))
  ));
internals.sequelize = sequelize;
internals.tables = {};
async function initialize () {
  for (let m in tables) {
    let seq = sequelize.define(m, tables[m].model.table, tables[m].model.options);
    internals.tables[m] = seq;
  }
  for (let m in tables) {
    if (tables[m].associate) {
      let tabArr = cast(tables[m].associate);
      tabArr.forEach(function (ele) {
        if (ele.type === 'belongsToMany') {
          internals.tables[m].belongsToMany(internals.tables[ele.to], ele.options);
        } else if (ele.type === 'belongsTo') {
          internals.tables[m].belongsTo(internals.tables[ele.to], ele.options);
        } else if (ele.type === 'hasMany') {
          internals.tables[m].hasMany(internals.tables[ele.to], ele.options);
        } else if (ele.type === 'hasOne') {
          internals.tables[m].hasOne(internals.tables[ele.to], ele.options);
        }
      });
    }
  }
  for (let m in internals.tables) {
    await internals.tables[m].sync();
  }
}
initialize();
module.exports = internals;
