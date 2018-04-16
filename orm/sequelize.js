const Sequelize = require('sequelize');

const connection = new Sequelize('blockchain', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    operatorsAliases: false //Vll doch mal auf true setzen
});

module.exports = connection;