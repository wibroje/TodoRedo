const createError = require('http-errors');
const express 	  = require('express');
const path 		  = require('path');
const logger 	  = require('morgan');
const bodyParser  = require('body-parser');
const mongoose 	  = require('mongoose');
const app 		  = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', function(req,res) {
	res.render('index')
});

app.post('/todos', function(req,res) {
	res.json(req.body);
})






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


app.listen(3000, function() {
	console.log('Listening on port 3000');
});
