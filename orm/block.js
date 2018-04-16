const db = require('./sequelize.js');
const Sequelize = require('sequelize');

const Block = db.define('block', {
    timestamp: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    previousHash: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    nonce: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Block;