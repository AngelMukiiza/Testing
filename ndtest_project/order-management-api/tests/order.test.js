const request = require("supertest");
const app = require("../server");
const { Order } = require("../models"); // Assuming you have an 'Order' model
const db = require("../config/database"); // Database connection or config file

describe("Order Management API", () => {
    let orderId;

    // Run this before all tests to setup any necessary data or configurations
    beforeAll(async () => {
        // Optional: if you need to clear or set up the database before running tests
        await db.sync(); // Syncs the database if you're using Sequelize or similar ORM
    });

    // Run this after all tests to cleanup data
    afterAll(async () => {
        await Order.destroy({ where: {} }); // Cleanup database after tests
        await db.close(); // Close the database connection
    });

    it("should create a new order and save to the database", async () => {
        const res = await request(app)
            .post("/orders")
            .send({ item: "Laptop", quantity: 2 });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.item).toBe("Laptop");

        // Verify the order is saved in the database
        const orderInDb = await Order.findByPk(res.body.id);
        expect(orderInDb).toBeTruthy();
        expect(orderInDb.item).toBe("Laptop");

        orderId = res.body.id;
    });

    it("should fetch all orders from the database", async () => {
        const res = await request(app).get("/orders");
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);

        // Optionally, check if the orders fetched from the API match the database
        const ordersInDb = await Order.findAll();
        expect(ordersInDb.length).toBeGreaterThan(0);
    });

    it("should fetch an order by ID from the database", async () => {
        const res = await request(app).get(`/orders/${orderId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(orderId);

        // Verify the fetched order matches the database
        const orderInDb = await Order.findByPk(orderId);
        expect(orderInDb).toBeTruthy();
        expect(orderInDb.id).toBe(orderId);
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
