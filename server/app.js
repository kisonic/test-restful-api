import http        from 'http';
import express     from 'express';
import favicon     from 'serve-favicon';
import bodyParser  from 'body-parser';
import path        from 'path';
import config      from './config';
import Logger      from './libs/log';
import ToDoModel   from './libs/mongoose';

const log = Logger(module);
const app = express();

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, '..', 'public')));

app.route('/todo')

	.get((req, res) =>
		ToDoModel.find((err, todos) => {
			if (!err) {
				log.info('todo get: ' + todos);
				return res.send({ items: todos });
			} else {
				res.statusCode = 500;
				log.error('Internal error(%d): %s',res.statusCode,err.message);
				return res.send({ error: 'Server error' });
			}
		})
	)

	.post((req, res) => {
		const todo = new ToDoModel({
			title: req.body.title
		});

		todo.save((err) => {
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

app.use((req, res, next) => {
	res.status(404);
	log.debug('Not found URL: %s',req.url);
	res.send({ error: 'Not found' });
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	log.error('Internal error(%d): %s',res.statusCode,err.message);
	res.send({ error: err.message });
});

const server = http.createServer(app);
server.listen(config.get('port'), () =>
	log.info('Express server listening on port ' + config.get('port'))
);
