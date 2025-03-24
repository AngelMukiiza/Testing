const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

// Set up Sequelize with SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',  // Path to the SQLite file
});

// Define the Order model
const Order = sequelize.define('Order', {
    item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Sync the database (creates the table if it doesn't exist)
sequelize.sync();

// Set up the Express app
const app = express();
app.use(bodyParser.json());

// Create an order
app.post("/orders", async (req, res) => {
    try {
        const order = await Order.create({ item: req.body.item, quantity: req.body.quantity });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all orders
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get order by ID
app.get("/orders/:id", async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete order by ID
app.delete("/orders/:id", async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            await order.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;  // Export app for testing

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
