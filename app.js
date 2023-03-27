var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nocache = require("nocache");
const session = require('express-session');

//const expressLayouts=require('express-ejs-layouts')

const ejs = require('ejs');

//mongo-start
var db=require('./config/connection')

 db.connect((err)=>{
   if(err)
   console.log("error:-"+err);
   else
     console.log("database connected");
 })

 //mongo-end



var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 //app.use(expressLayouts);
// app.set('layout','la')



app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(nocache());
app.use(session({ secret: 'key', cookie: { maxAge: 6000000 } }));

//admin- side-use cheyyumpol
//app.use(express.static(path.join(__dirname, "public/admin-assets")));


app.use('/', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
