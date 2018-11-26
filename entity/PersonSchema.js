const Sequelize = require('sequelize');

const PersonSchema={
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        field:'name'
    },
    age: {
        type: Sequelize.INTEGER,
        field:'age'
    },
    comment: {
        type: Sequelize.STRING,
        field:'comment'
    },
}

exports.PersonSchema=PersonSchema