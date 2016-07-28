var express = require('express');
var wagner = require('wagner-core');

//Inyeccion de dependencias
require('./models')(wagner);
require('./dependencies.js')(wagner);

var app = express();

app.use(require('morgan')());

//Facebook - passport
wagner.invoke(require('./utils/auth'), { app: app });

//Routes
app.use('/test', require('./routes/test')(wagner));

//Express Config
app.use(express.static('../frontend/public'));

app.listen(3000);
console.log('Listening on port 3000!');
