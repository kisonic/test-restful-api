var http            = require('http');
var express         = require('express');
var favicon         = require('serve-favicon');
var bodyParser      = require('body-parser');
var path            = require('path');
var config          = require('./config');
var log             = require('./libs/log')(module);
var ToDoModel       = require('./libs/mongoose').ToDoModel;

var app = express();

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, '..', 'public')));

app.route('/todo')

	.get(function(req, res) {
		return ToDoModel.find(function (err, todos) {
			if (!err) {
				log.info('todo get: ' + todos);
				return res.send({ items: todos });
			} else {
				res.statusCode = 500;
				log.error('Internal error(%d): %s',res.statusCode,err.message);
				return res.send({ error: 'Server error' });
			}
		});
	})

	.post(function(req, res) {
		var todo = new ToDoModel({
			title: req.body.title
		});

		todo.save(function (err) {
			if (!err) {
				log.info('todo posted: ' + todo);
				return res.send({ items: todo });
			} else {
				if(err.name == 'ValidationError') {
					res.statusCode = 400;
					res.send({ error: 'Validation error' });
				} else {
					res.statusCode = 500;
					res.send({ error: 'Server error' });
				}
				log.error('Internal error(%d): %s',res.statusCode,err.message);
			}
		});
	});

app.use(function(req, res, next) {
	res.status(404);
	log.debug('Not found URL: %s',req.url);
	res.send({ error: 'Not found' });
	return;
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	log.error('Internal error(%d): %s',res.statusCode,err.message);
	res.send({ error: err.message });
	return;
});

var server = http.createServer(app);
server.listen(config.get('port'), function() {
	log.info('Express server listening on port ' + config.get('port'));
});
