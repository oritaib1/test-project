const Sequelize = require('sequelize');

const sequelize = require('../data-base');

const User = sequelize.define('users', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName:{
    type: Sequelize.STRING,
    allowNull:false
  },
  lastName:{
    type: Sequelize.STRING,
    allowNull:false
  },
  email:{
    type: Sequelize.STRING,
    allowNull:false,
    unique: true,
  },
  phoneNumber:{
    type: Sequelize.STRING,
    allowNull:false
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = User;