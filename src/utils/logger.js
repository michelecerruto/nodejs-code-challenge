const { createLogger, format, transports } = require("winston");

const logger = createLogger({
	transports: [
		new transports.File({
			filename: "logs/logging.log",
		}),
	],
	format: format.combine(
		format.label({
			label: `Log`,
		}),
		format.timestamp({
			format: "DD-MMM-YYYY HH:mm:ss",
		}),
		format.printf(
			(info) =>
				`${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`,
		),
	),
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new transports.Console({
			format: format.combine(),
		}),
	);
}

const audit = createLogger({
	transports: [
		new transports.File({
			filename: "logs/audit.log",
		}),
	],
	format: format.combine(
		format.label({
			label: `Audit`,
		}),
		format.timestamp({
			format: "DD-MMM-YYYY HH:mm:ss",
		}),
		format.printf(
			(info) =>
				`${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`,
		),
	),
});

if (process.env.NODE_ENV !== "production") {
	audit.add(
		new transports.Console({
			format: format.combine(),
		}),
	);
}

module.exports = { logger, audit };
