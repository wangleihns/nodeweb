const Sequelize = require('sequelize');

const UserSchema = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createId: {
        type: Sequelize.BIGINT,
        field:'create_id'
    },
    createTime: {
        type: Sequelize.BIGINT,
        field:'create_time'
    },
    updateId: {
        type: Sequelize.BIGINT,
        field:'update_id'
    },
    updateTime: {
        type: Sequelize.BIGINT,
        field:'update_time'
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        field:'email'
    },
    phone: {
        type: Sequelize.STRING,
        unique: true,
        field:'phone'
    },
    loginIp: {
        type: Sequelize.STRING,
        field:'login_ip'
    },
    loginTime: {
        type: Sequelize.STRING,
        field:'login_time'
    },
    loginName:{
        type: Sequelize.STRING,
        field:'login_name'
    },
    name: {
        type: Sequelize.STRING,
        field:'name'
    },
    password: {
        type: Sequelize.STRING,
        field:'password'
    },
    supId: {
        type: Sequelize.INTEGER,
        field:'sup_id'
    },
    accountNonExpired: {
        type: Sequelize.BOOLEAN,
        field:'account_non_expired'
    },
    credentialsNonExpired: {
        type: Sequelize.BOOLEAN,
        field:'credentials_non_expired'
    },
    accountNonLocked: {
        type: Sequelize.BOOLEAN,
        field:'account_non_locked'
    },
    enabled: {
        type: Sequelize.BOOLEAN,
        field:'enabled'
    },

}
exports.UserSchema = UserSchema;