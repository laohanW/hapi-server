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
let sortTables = [];
function getLength () {
  let i = 0;
  for (let m in tables) {
    i++;
    if (m) {

    }
  }
  return i;
}
function sort () {
  let len = getLength();
  for (let i = 0; i < len; i++) {
    let min = 9999;
    for (let m in tables) {
      let has = false;
      for (let n in sortTables) {
        if (tables[m].priority === sortTables[n]) {
          has = true;
        }
      }
      if (!has && tables[m].priority < min) {
        min = tables[m].priority;
      }
    }
    sortTables.push(min);
  }
}
async function initialize () {
  sort();
  for (let i = 0; i < sortTables.length; i++) {
    let p = sortTables[i];
    for (let m in tables) {
      // console.log(m);
      // console.log(tables[m]);
      if (tables[m].priority === p) {
        let seq = sequelize.define(m, tables[m].model.table, tables[m].model.options);
        internals.tables[m] = seq;
        if (tables[m].associate) {
          if (tables[m].associate.type === 'belongsToMany') {
            internals.tables[m].belongsToMany(internals.tables[tables[m].associate.to], tables[m].associate.options);
          } else if (tables[m].associate.type === 'belongsTo') {
            internals.tables[m].belongsTo(internals.tables[tables[m].associate.to], tables[m].associate.options);
          } else if (tables[m].associate.type === 'hasMany') {
            internals.tables[m].hasMany(internals.tables[tables[m].associate.to], tables[m].associate.options);
          } else if (tables[m].associate.type === 'hasOne') {
            internals.tables[m].hasOne(internals.tables[tables[m].associate.to], tables[m].associate.options);
          }
        }
        await seq.sync();
      }
    }
  }
}
initialize();
module.exports = internals;
