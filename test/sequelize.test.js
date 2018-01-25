const expect = require('chai').expect;
const Sequelize = require('sequelize');
const Config = require('config');
const LocalStorage = require('continuation-local-storage');
const namespace = LocalStorage.createNamespace('my-ver-test-namespace');
let models = {};
before(function(done){
  Sequelize.useCLS(namespace);
  const sequelize = new Sequelize(
    Config.get('db.database'),
    Config.get('db.username'),
    Config.get('db.password'),
    JSON.parse(JSON.stringify(Config.get('db'))
    ));
  models.sequelize=sequelize;
  models.tables={};
  const user = sequelize.define('user',
  {
     userId:{
       type:Sequelize.INTEGER,
       primaryKey:true,
       autoIncrement: true
     },
     account:{
       type:Sequelize.STRING
     }
  },
  {
    timestamp: false
  });
  models.tables.user = user;
  const fans = sequelize.define('fan',{
    userId:{
      type:Sequelize.INTEGER
    },
    fansId:{
      type:Sequelize.INTEGER
    }
  },
  {
    timestamp: false
  });
  models.tables.fans = fans;
  user.sync().then(function(){
    fans.sync().then(function(){
      user.hasMany(fans,{
        foreignKey:'userId'
      });
      done();
    });
  });
});
describe('sequelize test', function () {
  it.skip ('user create',function () {
    models.sequelize.transaction(function(){
      models.tables.user.create({
        account:'laohan'
      }).then(function(result){
        expect(result).to.be.ok;
      })
    });
  }); 
  it.skip('fans create',function(){
    models.sequelize.transaction(function(){
      models.tables.fans.create({
        userId:1,
        fansId:2
      }).then(function(result){
        expect(result).to.be.ok;
      });
    });
  });
  it ('user find',function(){
    let userId=1;
    models.tables.user.findAll({
      where:{
        userId:userId
      },
      limit:1,
      include:[
        {
          model:models.tables.fans
        }
      ]
    }).then(function(result){
      // console.log(result);
      expect(result).to.be.ok;
    });
  });
});
