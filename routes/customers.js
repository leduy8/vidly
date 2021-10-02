const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const { Customer, validate } = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  if (!customers) return res.status(404).send("No customer found.");

  return res.send(customers);
});

router.get("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid Id.");

    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found.");

    return res.send(customer);
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold || false,
    });
    customer = await customer.save();
    return res.send(customer);
  } catch (e) {
    console.log(e.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid Id.");

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
      { new: true }
    );
    if (!customer)
      return res.status(404).send("Customer with given ID not found.");
    return res.send(customer);
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid Id.");

    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
      return res.status(404).send("Customer with given ID is not found.");

    return res.send(customer);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
