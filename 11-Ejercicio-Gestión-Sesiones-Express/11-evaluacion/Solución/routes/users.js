var mongojs = require('mongojs')

var express = require('express');
var router = express.Router();

var expressValidator = require("express-validator");
var ObjectId = mongojs.ObjectId;


router.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
    while (namespace.length) {
      forParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg: msg,
      value: value
    };
  }
}));

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

var db = mongojs('clientesapp', ['users'])

router.get("/", function(req, res) {
  if(req.session.email) {
      db.users.find(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        res.render('index2', {
          title: 'Customers',
          users: docs,
          errors: null,
          email: req.session.email
        });
      }
    });
  } else{
    console.log(req.session);
    res.send(
      `<h1>Please login first</h1>
      <a href="/email-password.html">Login</a>`
    );
  }
});


router.post("/add", function(req, res) {
  req.checkBody("first_name", "El nombre es obligatorio").notEmpty();
  req.checkBody("last_name", "El apellido es obligatorio").notEmpty();
  req.checkBody("email", "El email es obligatorio").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.render('index2', {
      title:'Customers',
      errors: errors
    });
  }else{
    var newUser = {
      "first_name" : req.body.first_name,
      "last_name" : req.body.last_name,
      "email" : req.body.email
    };
    db.users.insert( newUser, function( err, resp ) {
      if (err) {
        console.log(err);
      } else {
        db.users.insert( newUser );
      }
    });
  }
  res.redirect('/users');
});


router.delete('/delete/:id', function(req, res){
  db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
    if (err){
      console.log(err);
    }
    //res.redirect(302,'/users');
    return res.send();
  });
});

router.post('/find/:id',function(req, res){
  db.users.findOne({
    _id: ObjectId(req.params.id)
  }, function(err, doc) {
    if (err) {
      console.log(err);
    }
    return res.send(doc);
  });
});

router.post('/update/:id', function(req, res){
  req.checkBody("first_name", "El nombre es obligatorio").notEmpty();
  req.checkBody("last_name", "El apellido es obligatorio").notEmpty();
  req.checkBody("email", "El email es obligatorio").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.render('index', {
      title:'Customers',
      errors: errors
    });
  }else{
    var parametros = { $set: {
        "first_name": req.body.first_name,
        "last_name" : req.body.last_name,
        "email" : req.body.email
      } };
    db.users.update({_id: ObjectId(req.params.id)}, parametros, function( err, resp ) {
      if (err) {
        console.log(err);
      } else {
        db.users.update({_id: ObjectId(req.params.id)}, parametros);
      }
    });
  }
  res.redirect('/users');
});


module.exports = router;
