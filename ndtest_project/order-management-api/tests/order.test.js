const request = require("supertest");
const app = require("../server");
const { Order } = require("../models"); // Assuming you have an 'Order' model
const sequelize = require('../database');  // Ensure you're using the correct path

describe("Order Management API", () => {
    let orderId;

    // Run this before all tests to setup any necessary data or configurations
    beforeAll(async () => {
        // Sync the database and create tables before tests
        await sequelize.sync(); // Only this one is needed
    });

    // Run this after all tests to cleanup data
    afterAll(async () => {
        // Cleanup the database after tests
        await Order.destroy({ where: {} });
        await sequelize.close(); // Close the database connection
    });


    it("should fetch all orders from the database", async () => {
        const res = await request(app).get("/orders");
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);

        // Optionally, check if the orders fetched from the API match the database
        const ordersInDb = await Order.findAll();
        expect(ordersInDb.length).toBeGreaterThan(0);
    });


    it("should return 404 for non-existing order", async () => {
        const res = await request(app).get(`/orders/999`);
        expect(res.status).toBe(404);

        // Ensure no order with this ID exists in the database
        const orderInDb = await Order.findByPk(999);
        expect(orderInDb).toBeNull();
    });

    it("should delete an order from the database", async () => {
        const res = await request(app).delete(`/orders/${orderId}`);
        expect(res.status).toBe(204);

        // Verify the order is deleted from the database
        const orderInDb = await Order.findByPk(orderId);
        expect(orderInDb).toBeNull();
    });
});
