const UserSchema = require('../entity/UserSchema').UserSchema

const Sequelize = require('sequelize');
const sequelize = new Sequelize('ftcg_test', 'root', 'Wind@2015', {
  host: '114.215.191.93',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define:{
    freezeTableName: true,  //单表名
    timestamps: false   //忽略创建时间错
  }
});
//测试链接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const User = sequelize.define('kn_user', UserSchema);

  exports.User = User