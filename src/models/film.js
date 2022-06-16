const { Schema, model } = require("mongoose");

const filmSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "A film must have a title"],
		},
		"original-title": {
			type: String,
			required: false,
		},
		"production-year": {
			type: Number,
			required: false,
		},
		genre: {
			type: String,
			required: false,
		},
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

const Film = model("film", filmSchema);

module.exports = Film;
