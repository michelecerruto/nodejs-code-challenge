const Film = require("../models/film");

const films = [
	{
		title: "Il cavaliere oscuro",
		"original-title": "Batman Begins",
		"production-year": 2008,
		genre: "Azione",
	},
	{
		title: "Tenet",
		"original-title": "Tenet",
		"production-year": 2020,
		genre: "Fantascienza",
	},
	{
		title: "Inception",
		"original-title": "Inception",
		"production-year": 2010,
		genre: "Animazione",
	},
	{
		title: "Interstellar",
		"original-title": "Interstellar",
		"production-year": 2014,
		genre: "Fantascienza",
	},
];

const loadData = async () => {
	var array = [];
	array.push(Film.create(films));
	await Promise.all(array);
};

module.exports = { loadData };