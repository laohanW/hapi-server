'use strict';
const Glob = require('glob');
const Path = require('path');
const Sequelize = require('sequelize');
const Config = require('config');
const LocalStorage = require('continuation-local-storage');
const namespace = LocalStorage.createNamespace('my-ver-own-namespace');

const pattern = './*.model.js';
let tables = {};
let defineTables = {};
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
async function initialize () {
  for (let m in tables) {
    let seq = sequelize.define(m, tables[m].model.table, tables[m].model.options);
    defineTables[m] = seq;
  }
  for (let m in tables) {
    if (tables[m].associate) {
      let tabArr = cast(tables[m].associate);
      tabArr.forEach(function (ele) {
        if (ele.type === 'belongsToMany') {
          defineTables[m].belongsToMany(defineTables[ele.to], ele.options);
        } else if (ele.type === 'belongsTo') {
          defineTables[m].belongsTo(defineTables[ele.to], ele.options);
        } else if (ele.type === 'hasMany') {
          defineTables[m].hasMany(defineTables[ele.to], ele.options);
        } else if (ele.type === 'hasOne') {
          defineTables[m].hasOne(defineTables[ele.to], ele.options);
        }
      });
    }
  }
  await sequelize.sync()
}
initialize();
module.exports = sequelize;
