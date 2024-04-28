let express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var admin = require("firebase-admin");
var MongoDBStore = require('connect-mongodb-session')(session);
var path = require('path');

function checkAuth(req, res, next) {
  if (!req.session.userId) {
    res.send('Necesitas autenticarte primero');
  } else {
    next();
  }
}

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var serviceAccount = require("./dawe-key.json");

var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/dawe',
  collection: 'dawe-firebase'
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  store: store,
  saveUninitialized: true,
}));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/users');
  } else {
    res.redirect('/email-password.html');
  }
});

app.post('/getToken', (req, res) => {
  var idToken = req.body.idToken;

  admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      req.session.userId = uid;
      res.redirect('/users');
    }).catch(function(error) {
      res.send('Token inválido');
    });
});

app.get('/users', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/?logout');
  });
});

app.listen(3000)