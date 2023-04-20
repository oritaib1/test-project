const Sequelize = require('sequelize');

const sequelize = require('../data-base');

const Project = sequelize.define('orders', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING,
    allowNull:false
  },
  score:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  durationInDays:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  bugsCount:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  madeDadeline:{
    type: Sequelize.STRING,
    allowNull:false
  },
})

module.exports = Project;