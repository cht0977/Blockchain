const connection = require('./sequelize');

var Transaction = require('./transaction');
var Block = require('./Block');

Block.hasMany(Transaction, {as: 'Transaktionen'});


connection.sync({
    force: true,
    logging: console.log
}).then(()=>{

}).catch(()=>{

});