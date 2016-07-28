/*
Aqui se agregan todas las dependencias a wagner que las hace accesibles desde 
cualquier parte del codigo y solo se instancia una sola vez.
*/

var fs = require('fs');
var security = require('./utils/security');

module.exports = function(wagner){

    wagner.factory('Config', function() {
    return JSON.parse(fs.readFileSync('./config.json').toString());
    });

    wagner.factory('Security',security);
    
}


