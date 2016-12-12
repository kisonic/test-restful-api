import winston     from 'winston';

export default (module) => new winston.Logger({
	transports: [
		new winston.transports.Console({
			colorize: true,
			level:    'debug',
			label:    module.filename.split('/').slice(-2).join('/')
		})
	]
});
