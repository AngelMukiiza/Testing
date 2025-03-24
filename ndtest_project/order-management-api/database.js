const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:' // Use an in-memory database for testing, or specify a test DB file
});

module.exports = sequelize;
