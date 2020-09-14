//const { json } = require('body-parser');
var bodyParser = require('body-parser'); // a middleware for post requests
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://test:test@test.igi2u.mongodb.net/test?retryWrites=true&w=majority' , {useNewUrlParser: true , useUnifiedTopology: true})
 
//create a schema - like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);



//var data = [{item:'get high'} , {item: 'get wet'} , {item: 'coding'}];  // a temporary database
//var urlencodedParser = bodyParser.urlencoded({extended:false}); 

module.exports = (function(app){


app.get('/todo', function(req,res){
    // get data from mongodb and pass it to view
    Todo.find({} , function(err,data){
        if(err) throw err;
        res.render('todo',{todos: data});
    });

});

app.post('/todo', function(req,res){
    //get data from view and pass it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    }); });

app.delete('/todo/:item', function(req,res){
    // delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err,data){
        if(err) throw err;
        res.json(data);
    });

});
    
})