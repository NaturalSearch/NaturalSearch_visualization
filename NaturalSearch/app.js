// imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');

var url = require('url');



//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resultRouter = require('./routes/result');
var loadRouter = require('./routes/load_json');
var exampleRouter = require('./routes/example');
//var projectsRouter = require('./routes/projects');
var proponentesRoutes = require('./routes/proponentes');
var projetosRoutes = require('./routes/projetos');
var relacionamentoRoutes = require('./routes/relacionamento');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static',express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/result', resultRouter);
app.use('/example', exampleRouter);
app.use('/load_json', loadRouter);
//app.use('/projects', projectsRouter);
app.use('/proponentes',proponentesRoutes);
app.use('/projetos', projetosRoutes);
app.use('/relacionamento',relacionamentoRoutes);
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
