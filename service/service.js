const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const  User = require('../config/config').User;

const Person = require('../config/config').Person;

exports.Service ={
    getEntityByName: async(ctx)=>{
        console.log(ctx.request.body)
        let loginData = ctx.request.body;
        let username = loginData.username;
        let password = loginData.password;
        console.log(username, password)
        let user = await User.findOne({where:{
            [Op.or]:[{name:username},{phone:username}]
        }})
        // let user = {username:username, password:password}
        let flag = false
        console.log(user)
        if(user != null) {
            if(user.password == password){
                flag = true
            } else {
                rflag = false;
            }
        } else {
            flag = false;
        }
        if(flag){
            console.log(123)
            ctx.body={
                status:200,
                msg:'登录成功',
                token:'123'
            }
        } else {
            ctx.body={
                status:500,
                msg:'用户名或密码不正确'
            }
        }
    },
    save:(person)=>{
        Person.create(person)
    },
    findAllPerson: async(ctx)=>{
        let persons = await Person.findAll()
        ctx.body = {
            status:200,
            msg:'liebiao',
            data:persons
        }
    }

}