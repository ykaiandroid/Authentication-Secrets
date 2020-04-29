require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const md5 = require('md5');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const url = process.env.DB_URI;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('Connected to databse succesfull.'))
  .catch((error) => console.error(error));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(encrypt, {
  secret: process.env.SECRET,
  encryptedFields: ['password'],
});

const User = mongoose.model('User', userSchema);

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', function (req, res) {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password),
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render('secrets');
    }
  });
});

app.post('/login', function (req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({ email: username }, function (err, foundUser) {
    if (err) {
      console.error(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render('secrets');
        }
      }
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', console.log(`Server started on port ${port}`));
