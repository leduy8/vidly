const express = require("express");
const { isValidObjectId } = require("../middlewares");
const { Genre, validate } = require("../models/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  if (!genres) return res.status(404).send("No genre found.");

  return res.send(genres);
});

router.get("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).send("Invalid Id.");

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found.");

    return res.send(genre);
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    return res.send(genre);
  } catch (e) {
    console.log(e.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).send("Invalid Id.");

    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre) return res.status(404).send("Genre with given ID not found.");
    return res.send(genre);
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).send("Invalid Id.");

    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
      return res.status(404).send("Genre with given ID is not found.");

    return res.send(genre);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
