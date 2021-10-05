const express = require("express");
// const mongoose = require("mongoose");
// const Fawn = require("fawn");
const ObjectId = require("mongoose").Types.ObjectId;
const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const router = express.Router();

// Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort({ dateOut: -1 });
  if (!rentals) return res.status(404).send("No rental found.");

  return res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Movie with given id is not found.");
  if (movie.numberInStock === 0) return res.status(400).send("Movie not in stock.");
  
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Customer with given id is not found.");

  try {
    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    rental = await rental.save();

    movie = await Movie.updateOne({ _id: movie._id }, { $inc: { numberInStock: -1 } })
    
    return res.send(rental);

    // try {
    //   new Fawn.Task()
    //     .save("rentals", rental)
    //     .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    //     .run();

    //   return res.send(rental);
    // } catch (e) {
    //   console.log(e.message);
    //   return res.status(500).send("Something failed.");
    // }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
