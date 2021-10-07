const express = require("express");
const _ = require('lodash');
const { User, validate } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered.");

  try {
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    await user.setPassword(req.body.password);
    user = await user.save();

    return res.send(_.pick(user, ['_id', 'name', 'email']));
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
