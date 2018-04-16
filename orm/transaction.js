const db = require('./sequelize.js');
const Sequelize = require('sequelize');

const Transaction = db.define('transaction', {
    fromAdresse: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    toAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Transaction;