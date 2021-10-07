const express = require("express");
const { isValidObjectId } = require("../utils");
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  if (!movies) return res.status(404).send("No movie found.");

  return res.send(movies);
});

router.get("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).send("Invalid Id.");

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found.");

    return res.send(movie);
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Genre with given id is not found.");

  try {
    let movie = new Movie({ 
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
    });
    movie = await movie.save();
    return res.send(movie);
  } catch (e) {
    console.log(e.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).send("Invalid movie Id.");

    const genre = Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send("Genre with given id is not found.");

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { 
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
      },
      { new: true }
    );
    if (!movie) return res.status(404).send("Movie with given ID not found.");
    return res.send(movie);
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).send("Invalid Id.");

    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie)
      return res.status(404).send("Customer with given ID is not found.");

    return res.send(movie);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
