const app = require("./app");
const db = require("./config/db");
const { logger } = require("./utils/logger");

db.connect();

const port = process.env.PORT || 8080;
app.listen(port, () => {
	logger.info(`Server started and running on http://localhost:${port}`);
});
