const Sequelize = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'X9hYVUcQPIStpPGHWtqh', {
  host: 'containers-us-west-180.railway.app',
  dialect: 'mysql',
  port: 7015
});

module.exports = sequelize;

