const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizzaModel");

router.get("/getallpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (err) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addpizza", async (req, res) => {
  const pizza = req.body.pizza;
  try {
    const newPizza = new Pizza({
      name: pizza.name,
      image: pizza.image,
      varients: ["small", "medium", "large"],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices],
    });
    await newPizza.save();
    res.send("New Pizza Successfully Added");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getpizzabyid", async (req, res) => {
  const pizzaId = req.body.pizzaid;
  try {
    const pizza = await Pizza.findOne({ _id: pizzaId });
    res.send(pizza);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/editpizza", async (req, res) => {
  const editedPizza = req.body.editedPizza;
  try {
    const pizza = await Pizza.findOne({ _id: editedPizza._id });

    (pizza.name = editedPizza.name),
      (pizza.description = editedPizza.description),
      (pizza.image = editedPizza.image),
      (pizza.category = editedPizza.category),
      (pizza.category = editedPizza.category),
      (pizza.prices = [editedPizza.prices]);

    await pizza.save();

    res.send("Pizza Details Successfully Updated");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deletepizza", async (req, res) => {
  const pizzaId = req.body.pizzaId;
  try {
    await Pizza.findOneAndDelete({ _id: pizzaId });
    res.send("Pizza Successfully Deleted");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
