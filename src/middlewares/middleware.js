const { logger } = require("../utils/logger");

const notFound = (req, res, next) => {
	logger.error("Server Error 404 - Not Found");
	res.status(404);
	const error = new Error("Not Found", req.originalUrl);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	logger.error("Server Error " + req.statusCode || 500 + " " + err.message);
	res.status(res.statusCode || 500);
	res.json({
		message: err.message,
		reference: err.stack,
	});
};

module.exports = {
	notFound,
	errorHandler,
};
