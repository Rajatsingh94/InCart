var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// APIS

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error',console.log.bind(console,'#Mongo - conenction error'));

// --- set up session--->

app.use(session({
    secret:'mySecretString',
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge: 1000 *60 *60 *24 *2},
    store: new MongoStore({mongooseConnection:db,ttl:2*24*60*60})
}))

//
//save to session//
app.post('/cart',function(req,res){
  var cart = req.body;
  req.session.cart= cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.join(req.session.cart);
  })
});

// get session cart API

app.get('/cart',function(req,res){
  if(typeof req.session.cart !=='undefined'){
    res.json(req.session.cart);
  }
});

//

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

// get book API

app.get('/images',function(req,res){
  const imgFolder = __dirname + '/public/images/';

  //require file system//
  const fs = require('fs');

  fs.readdir(imgFolder,function(err,files){
    if(err){
      return console.error(err);
    }
    const filesArr =[];
  //  var i = 1;
    files.forEach(function(file){
      filesArr.push({name:file});
    //  i++
    });
    res.json(filesArr);
  })
})


//


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
