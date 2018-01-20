const Glob = require('glob');
const Path = require('path');
const Sequelize = require('sequelize');
const Config = require('config');
const LocalStorage = require('continuation-local-storage');
const namespace = LocalStorage.createNamespace('my-ver-own-namespace');

const pattern = './*.model.js';
let internals={};
let models={};
const globtions={
    nodir: true,
    strict: true,
    ignore: [],
    cwd: Path.dirname(__filename)
}
const matches = Glob.sync(pattern,globtions);
matches.forEach(match => {
    const load = require(globtions.cwd + '/' + match);
    const conHandlerName=Path.basename(match, Path.extname(match));
    const handlerName=Path.basename(conHandlerName, Path.extname(conHandlerName));
    const cls=load.default || load;
    models[handlerName]=cls;
});
Sequelize.useCLS(namespace);
const sequelize = new Sequelize(
    Config.get('db.database'),
    Config.get('db.username'),
    Config.get('db.password'),
    JSON.parse(JSON.stringify(Config.get('db'))
));
internals.sequelize = sequelize;
internals.models={};
async function initialize() {
    for(let m in models){
        let seq = sequelize.define(m,models[m].table);
        await seq.sync();
        internals.models[m]=seq;
    }
    for(let m in models){
        if(models[m].associate){
            if(models[m].associate.type === 'belongsToMany'){
                internals.models[m].belongsToMany(internals.models[models[m].associate.to],models[m].associate.options);
            }
            else if(models[m].associate.type === 'belongsTo'){
                internals.models[m].belongsTo(internals.models[models[m].associate.to],models[m].associate.options);
            }
            else if(models[m].associate.type === 'hasMany'){
                internals.models[m].hasMany(internals.models[models[m].associate.to],models[m].associate.options);
            }
            else if(models[m].associate.type === 'hasOne'){
                internals.models[m].hasOne(internals.models[models[m].associate.to],models[m].associate.options);
            }
        }
    }
}
initialize();
module.exports = internals;