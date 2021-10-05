const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema({
      name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
      },
    }),
    required: true,
  },
  movie: {
    type: mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;
