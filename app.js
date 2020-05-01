require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();
<<<<<<< HEAD
=======

>>>>>>> temp
// INITIALISE THE APP
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

<<<<<<< HEAD
// SETUP EXPRESS-SESSION
app.use(
  session({
    secret: 'toGodbetheglory',
=======
// SETUP EXPRESS TO USE EXPRESS-SESSION
app.use(
  session({
    secret: process.env.SECRET,
>>>>>>> temp
    resave: false,
    saveUninitialized: false,
  })
);

// SETUP EXPRESS TO INITIALISE PASSPORT AND MANAGE SESSION
app.use(passport.initialize());
app.use(passport.session());

// SETUP MONGOOSE DATABASE
<<<<<<< HEAD
=======
const url = process.env.DB_URI;
>>>>>>> temp
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to databse succesfull.'))
  .catch((error) => console.error(error));

// SET THE MONGOOSE OPTIONS
mongoose.set('useCreateIndex', true);

// SETUP USERSCHEMA MONGOOSE SCHEMA
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

<<<<<<< HEAD
// PLUGIN PASSPORT-LOCAL MONGOOSE TO USER-SCHEMA
userSchema.plugin(passportLocalMongoose);

// SETUP THE USER MODEL WITH SCHEMA
=======
// SET THE PLUGIN FOR USER-SCHEMA AND USE THE PASSPORT-LOCAL-MONGOOSE
userSchema.plugin(passportLocalMongoose);

// SETUP THE USER MODEL WITH MONGOOSE SCHEMA
>>>>>>> temp
const User = mongoose.model('User', userSchema);

// SETUP LOCALSTRATEGY AND SERIALIZE-USER/DESERIALIZE-USER FUNCTIONS
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SETUP ALL THE ROUTES
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.get('/secrets', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('secrets');
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/register', function (req, res) {
  User.register({ username: req.body.username }, req.body.password, function (
    err,
    user
  ) {
    if (err) {
      console.log(err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/secrets');
      });
    }
  });
});

app.post('/login', function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
<<<<<<< HEAD
      passport.authenticate('local')(req, res, function () {
        res.redirect('/secrets');
      });
=======
      passport.authenticate('local', { failureRedirect: 'back' })(
        req,
        res,
        function () {
          res.redirect('/secrets');
        }
      );
>>>>>>> temp
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', console.log(`Server started on port ${port}`));
