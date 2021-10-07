const express = require("express");
const auth = require("../middlewares/auth");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  return res.send(user);
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered.");

  try {
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    await user.setPassword(req.body.password);
    user = await user.save();

    const token = user.generateToken();

    return res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
