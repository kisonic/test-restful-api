import mongoose    from 'mongoose';
import Logger      from './log';
import config      from '../config';

const log = Logger(module);

mongoose.connect(config.get('mongoose:uri'));

const db = mongoose.connection;

db.on('error', err =>
	log.error('connection error:', err.message)
);

db.once('open', () =>
	log.info("Connected to DB!")
);

const Schema = mongoose.Schema;

const ToDo = new Schema({
	title: { type: String, required: true }
});

const ToDoModel = mongoose.model('ToDo', ToDo);

export default ToDoModel;
