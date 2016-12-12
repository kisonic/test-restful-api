var mongoose = require('mongoose');
var log      = require('./log')(module);
var config   = require('../config');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
	log.error('connection error:', err.message);
});

db.once('open', function callback () {
	log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var ToDo = new Schema({
	title: { type: String, required: true }
});

var ToDoModel = mongoose.model('ToDo', ToDo);

module.exports.ToDoModel = ToDoModel;
