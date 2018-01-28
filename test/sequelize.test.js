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
  const User = sequelize.define('User',{
    id:{
      type:Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    username:{
      type:Sequelize.STRING,
      allowNull: true,
      comments: '用户名'
    },
    password:{
      type:Sequelize.STRING,
      allowNull: false,
      comment: '密码'
    },
    active:{
      type:Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '是否正常状态'
    }
  },
  {
    timestamps: false,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  models.tables.User = User;
  const UserCheckin = sequelize.define('UserCheckin',{
    id:{
      type:Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    userId:{
      type:Sequelize.Sequelize.BIGINT(11),
      field: 'user_id',
      unique: true,
      references: {
        model: 'User',
        key: 'id'
      },
      comment: '用户Id'
    },
    loginIp:{
      type:Sequelize.STRING,
      field: 'login_ip',
      allowNull: false,
      defaultValue: '',
      validate:{
        isIP: true
      },
      comment: '登陆Ip'
    }
  },
  {
    underscored: true,
    timestamps: true,
    tableName: 'userCheckin',
    comment: '用户登陆信息',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    indexes: [
      {
        name: 'userCheckin_userId',
        method: 'BTREE',
        fields:['user_id']
      }
    ]
  });
  
  models.tables.UserCheckin = UserCheckin;
  const UserAddress = sequelize.define('UserAddress',{
    id:{
      type:Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      comment: '主建'
    },
    userId:{
      type:Sequelize.BIGINT(11),
      allowNull: false,
      field: 'user_id',
      comment: '用户Id'
    },
    consignee:{
      type:Sequelize.STRING,
      field: 'consignee',
      allowNull: false,
      comment: '收获人'
    },
    address:{
      type:Sequelize.STRING(1024),
      field: 'address',
      allowNull: false,
      comment: '详细地址'
    },
    zipCode:{
      type:Sequelize.STRING(16),
      field: 'zip_code',
      allowNull: true,
      comment: '邮编'
    },
    tel:{
      type:Sequelize.STRING(32),
      field: 'tel',
      allowNull: false,
      comment: '电话'
    }
    },
  {
    underscored: true,
    timestamps: false,
    freezeTableName:  true,
    tableName: 'userAddress',
    comment: '用户地址表',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    indexes: [
      {
        name: 'userAddress_userId',
        method: 'BTREE',
        fields: ['user_id']
      }
    ]
  });
  models.tables.UserAddress= UserAddress;
  const Role = sequelize.define('Role',{
    id:{
      type:Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      comment: '角色Id'
    },
    roleName:{
      type:Sequelize.STRING,
      field: 'role_name',
      comment: '角色名'
    }
  },
  {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    tableName: 'role',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  })
  models.tables.Role= Role;
  User.hasOne(UserCheckin);
  UserCheckin.belongsTo(User);
  User.hasMany(UserAddress,{foreignKey:'user_id',targetKey:'id',as: 'Address'});
  User.belongsToMany(Role,{through: 'userRoles',as:'UserRoles'});
  Role.belongsToMany(User,{through: 'userRoles',as:'UserRoles'});
  sequelize.sync();
  done();
});
describe('sequelize test', function () {
  it .skip('user and role no set associate create',function () {
    Promise.all([
      models.tables.User.create({username:'itbitu', password: 'itbilu.com'}),
      models.tables.Role.create({roleName:'管理员'})
    ]).then(function(results){
      console.log(JSON.stringify({user:results[0].dataValues,role:results[1].dataValues}));
      expect(results).to.be.ok;
    }).catch(function(err){
      console.log(err);
      expect(err).to.be.ok;
    });
  }); 
  it.skip('user and usercheckin create',function(){
    models.tables.User.create({
      username:'laohan',
      password:'123'
    }).then(function(user){
      let userCheckin = models.tables.UserCheckin.build({loginIp:'127.0.0.1'});
      user.setUserCheckin(userCheckin);
      expect(user).to.be.ok;
    }).catch(function(err){
      expect(0).to.not.be.ok;
    })
  });
  it.skip ('user and role use associate findAll',function(){
    Promise.all([
      models.tables.User.create({username:'use associate',password:'235'}),
      models.tables.Role.create({roleName:'guanli'})
    ]).then(function(results){
      let user = results[0];
      let role = results[1];
      user.setUserRoles(role);
      expect(1).to.be.ok;
    }).catch(function(err){
      expect(err).to.not.be.ok;
    });
  });
  it.skip ('user and usercheckin find ',function(){
    models.tables.User.findOne({include:[models.tables.UserCheckin]})
    .then(function(user){
      console.log(JSON.stringify(user));
      expect(user).to.be.ok;
    }).catch(function(err){
      expect(err).to.not.be.ok;
    })
  });
  it.skip ('user and userAddress find',function(){
    models.tables.User.findOne().then(function(user){
      user.getAddress();
      console.log(JSON.stringify(user));
      expect(user).to.be.ok;
    }).catch(function(err){
      expect(err).to.not.be.ok;
    })
  });
  it.skip ('User and usercheckin update',function(){
    models.tables.User.findOne({include:[models.tables.UserCheckin]})
    .then(function(user){
      let userCheckin = models.tables.UserCheckin.build({userId:user.id, loginIp: '192.168.10.1'});
      user.setUserCheckin(userCheckin);
      expect(user).to.be.ok;
    }).catch(function(err){
      expect(err).to.not.be.ok;
    })
  });
  it ('user destroy',function(){
    models.tables.User.destroy({
      where:{
        id:3
      }
    }).then(function(result){
      console.log(result);
      expect(result).to.be.ok;
    }).catch(function(err){
      expect(err).to.not.be.ok;
    })
  });
});
