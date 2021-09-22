const express = require('express');
const router = express.Router();
const Joi = require("joi");

genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Action" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found.");

  res.send(genre);
});

router.post("/", (req, res) => {
  const { error, value } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);

  res.send(genre);
});

router.put("/:id", (req, res) => {
  genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found.");

  const { error, value } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;

  res.send(genre);
});

router.delete("/:id", (req, res) => {
  genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found.");

  const { error, value } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router