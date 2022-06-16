const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { logger, audit } = require("../utils/logger");

const setup = require("../config/setup");
const Film = require("../models/film");

// Get all films
router.get("/", async (req, res, next) => {
	try {
		const films = await Film.find();
		logger.info(
			process.env.APP_VERSION +
				" request-id " +
				new Date().getTime() +
				" getAll " +
				"200",
		);
		res.status(200).send(films);
	} catch (error) {
		next(error);
	}
});

// Get film by Id
router.get("/:id", async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			throw new Error("Id is not valid: insert a valid id");
		}

		const film = await Film.findById(req.params.id);

		if (!film) {
			throw new Error("Film not found: insert a valid id");
		}

		logger.info(
			process.env.APP_VERSION +
				" request-id " +
				new Date().getTime() +
				" getById " +
				"200",
		);
		res.status(200).json(film);
	} catch (error) {
		next(error);
	}
});

// Create new film
router.post("/", async (req, res, next) => {
	try {
		const film = new Film({
			title: req.body.title,
			"original-title": req.body["original-title"],
			"production-year": req.body["production-year"],
			genre: req.body.genre,
		});
		await film.save();
		logger.info(
			process.env.APP_VERSION +
				" request-id " +
				new Date().getTime() +
				" create " +
				"200",
		);
		audit.info("CREATE - " + JSON.stringify(film));
		res.send(film);
	} catch (error) {
		next(error);
	}
});

// Update film by Id
router.patch("/update/:id", async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			throw new Error("Id is not valid: insert a valid id");
		}

		const film = await Film.findOne({ _id: req.params.id });

		if (!film) {
			throw new Error("Film not found: insert a valid id");
		}

        // Check concurrency
		if (film.updated_at.getTime() != film.created_at.getTime()) {
			throw new Error("Concurrency error: Film already modified by another user");
		}

		film.title = req.body.title;
		if (req.body["original-title"]) {
			film["original-title"] = req.body["original-title"];
		}
		if (req.body["production-year"]) {
			film["production-year"] = req.body["production-year"];
		}
		if (req.body.genre) {
			film.genre = req.body.genre;
		}

		await film.save();

		audit.info("UPDATE - " + JSON.stringify(film));

		res.send(film);
	} catch (error) {
		next(error);
	}
});

// Delete film by Id
router.delete("/delete/:id", async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			throw new Error("Id is not valid: insert a valid id");
		}

		const film = await Film.findOne({ _id: req.params.id });

		if (!film) {
			throw new Error("Film not found: insert a valid id");
		}

		await Film.deleteOne(film._id);
		audit.info("DELETE - " + JSON.stringify(film));
		res.send(`${film.title} has been deleted..`);
	} catch (error) {
		next(error);
	}
});

// Load films into db
router.post("/setup/", async (req, res, next) => {
	try {
		setup.loadData();
		const films = await Film.find();
		res.send(films);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
