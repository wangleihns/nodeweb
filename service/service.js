const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const  User = require('../config/config').User;

const Person = require('../config/config').Person;

exports.Service ={
    getEntityByName: async(username)=>{
       
        console.log(username)
        let user = await User.findOne({where:{
            [Op.or]:[{loginName:username},{phone:username}]
        }})
        return user;
        
    },
    save:(person)=>{
        Person.create(person)
    },
    findAllPerson: async(ctx)=>{
        let persons = await Person.findAll({limit: 100})
        return persons;
    },
    getUserInfo: async(id)=>{
        let user =  await User.findById(id)
        return user;
    }

}