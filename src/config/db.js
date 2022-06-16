const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod = undefined;

const connect = async () => {
	mongod = await MongoMemoryServer.create({
		instance: {
			dbPath: "./src/_db",
		},
	});
	const uri = mongod.getUri();

	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	await mongoose.connect(uri, mongooseOpts);
};

const closeSession = async () => {
	session.endSession();
};

const closeDatabase = async () => {
	if (mongod) {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
		await mongod.stop();
	}
};

const clearDatabase = async () => {
	if (mongod) {
		const collections = mongoose.connection.collections;

		for (const key in collections) {
			const collection = collections[key];
			await collection.deleteMany();
		}
	}
};

module.exports = { connect, closeSession, closeDatabase, clearDatabase };
