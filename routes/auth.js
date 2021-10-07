const express = require("express");
const Joi = require('joi');
const { User } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  try {
    const isValid = await user.checkPassword(req.body.password);
    if (!isValid) return res.status(400).send("Invalid email or password.");
    
    const token = user.generateToken();
    res.send(token);
  } catch (e) {
    console.log(e.message);
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(11).max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
