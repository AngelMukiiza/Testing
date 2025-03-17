const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let orders = [];

// Create an order
app.post("/orders", (req, res) => {
    const order = { id: orders.length + 1, ...req.body };
    orders.push(order);
    res.status(201).json(order);
});

// Get all orders
app.get("/orders", (req, res) => {
    res.json(orders);
});

// Get order by ID
app.get("/orders/:id", (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    order ? res.json(order) : res.status(404).json({ message: "Order not found" });
});

// Delete order by ID
app.delete("/orders/:id", (req, res) => {
    orders = orders.filter(o => o.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = app;  // Export app for testing
