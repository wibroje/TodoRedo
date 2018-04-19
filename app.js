const createError = require('http-errors');
const express 	  = require('express');
const path 		  = require('path');
const logger 	  = require('morgan');
const bodyParser  = require('body-parser');
const mongoose 	  = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app-redo');

const Todo = require('./models/todo')
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
	Todo.find({}).then(function(results) {	
	res.render('index', { todos:results})
	})
});

app.post('/todos', function(req,res) {
	let newTodo = new Todo({
		description: req.body.description
	});

	newTodo.save().then(function(result) {	
	res.redirect('/');
	}).catch(function(err) {
		console.log(err);
		res.redirect('/');
	})
});

// app.put('/todos/:id', function(res,req) {
// 	Todo.findOneAndUpdate({
// 		_id: req.params.id
// 	}), 
// 	{$set:{description: req.body.description}},
// 	{upsert: true},
// 		function(err, newTodo){
// 			if(err){
// 				console.log('error occured');
// 			} else {
// 				console.log(newTodo);
// 			res.status(204);
// 		}
// 		}
// 	})

app.delete('/todos/:id', function(req,res) {
	Todo.findOneAndRemove({
		_id: req.params.id
	}, function(err, todo) {
		if(err) {
			res.send('error deleting');
		} else {
			console.log(todo);
			res.redirect('/');
		}
	});
});

	





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
