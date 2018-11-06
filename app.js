// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var webdevsRouter = require('./routes/webdevs');

require('dotenv').config();

mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log(`Connected to ${process.env.DATABASE} database`);
  })
  .catch((error) => {
    console.log(error);
    mongoose.connection.close();
  });

var app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

// Detta behöver vi inte använda ännu...läs på!
// app.use(session({
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60 // 1 day
//   }),
//   secret: 'some-string',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000
//   },
// }));

// view engine setup - jag skapar ju en api och behöver inte rendera någon hemsida här!
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', webdevsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404)); Detta byter jag ut mot nedanstående eftersom vi behandlar json-filer. Tidigare renderade vi ju!
  res.status(404).json({ code: 'not found' });
});

// error handler
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({ code: 'unexpected' });
  }
});

module.exports = app;
