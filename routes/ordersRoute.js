const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(
  "sk_test_51IvWePCEKXJra7le4qwaHid44PRQsL0leZZyPr5YVvvM9D424dXI7vLuYFQT9d7eHSZgmGVkkSZsjcHQIJNBibFg002FjhxBT2"
);
const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
  const { token, subTotal, currentUser, cartItems } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: subTotal * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userId: currentUser._id,
        orderItems: cartItems,
        orderAmount: subTotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          zip: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      newOrder.save();
      res.send("Order Placed Succesfully");
    } else {
      res.send("Payment not Successfull");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong" + " " + error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await Order.find({ userId: userId }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderId = req.body.orderId;
  try {
    const order = await Order.findOne({ _id: orderId });
    order.isDelivered = true;
    await order.save();
    res.send("Order Successfully Delivered");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
