var express = require('express');
var todoController = require('./controllers/todoController')

var app = express();

//set up template engine
app.set('view engine','ejs');

//temp
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//fire controllers
todoController(app);

//static files
app.use(express.static('./public'));

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');