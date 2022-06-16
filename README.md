# Node.js REST API

A base project to implement a RESTful API using Node.js and Express server and Mongoose.
Endpoints are accessible and public, no key or authorization is required. The published version is v1.

## Table of contents

- [Get Started](#get-started)
- [Libraries](#libraries)
- [API Endpoints](#api-endpoints)
- [Schema mongoose](#schema-mongoose)
- [License](#license)

## Get Started

### Clone the repository

Clone this repository by `git` and enter it:

```console
git clone https://github.com/michelecerruto/nodejs-code-challenge.git
cd nodejs-code-challenge
npm install
```

### Usage

- Run `npm run start` or `npm run dev` to use nodemon
- Open `http://localhost:3030/v1/` to test the endpoint

### Setup DB

Using `mongodb-memory-server` to create a db in memory. To load the data into the db you can use the endpoint `/v1/setup` or you can create it through the endpoint with `post` method

## Libraries

- [express](https://www.npmjs.com/package/express)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [helmet](https://www.npmjs.com/package/helmet)
- [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [morgan](https://www.npmjs.com/package/morgan)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [winston](https://www.npmjs.com/package/winston)

## API Endpoints

Add the versioning `/v1` to use the following endpoint

| Path        | Method | Description   |
| ----------- | ------ | ------------- |
| /           | GET    | getAllFilms   |
| /:id        | GET    | getOneFilm    |
| /           | POST   | createOneFilm |
| /update/:id | PATCH  | updateOneFilm |
| /delete/:id | DELETE | deleteOneFilm |
| /setup      | POST   | loadData DB   |

## Schema mongoose

```json
{
  "title": {
    "type": "String",
    "required": [true, "A film must have a title"],
  },
  "original-title": {
    "type": "String",
    "required": false,
  },
  "production-year": {
    "type": "Number",
    "required": false,
  },
  "genre": {
    "type": "String",
    "required": false,
  },
},
{ "timestamps": { "createdAt": "created_at", "updatedAt": "updated_at" } },

```

## License

This project is available under the [MIT license](https://opensource.org/licenses/MIT)
