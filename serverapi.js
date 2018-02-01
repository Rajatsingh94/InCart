var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// APIS

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var Books = require('./models/books.js');
//post book//
app.post('/books',function(req,res){
var book= req.body;

Books.create(book,function(err,books){

  if(err){
    throw err;
  }
  res.json(books);
})
});

//get method

app.get('books',function(req,res){
  Books.find(function(err,books){
    if(err)
    {
      throw err;
    }
    res.json(books)
  })
});
// delete method

app.delete('/books',function(req,res){
  var query = {_id:req.params._id};

  Books.remove(query,function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })

});

// update APIS




//

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.listen(3001,function(err){
  if(err){
    return console.log(err);
  }

  console.log("Api Server is listening to port 3001");
})
