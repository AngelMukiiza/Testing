const request = require("supertest");
const app = require("../server");

describe("Order Management API", () => {
    let orderId;

    it("should create a new order", async () => {
        const res = await request(app)
            .post("/orders")
            .send({ item: "Laptop", quantity: 2 });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.item).toBe("Laptop");
        orderId = res.body.id;
    });

    it("should fetch all orders", async () => {
        const res = await request(app).get("/orders");
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should fetch an order by ID", async () => {
        const res = await request(app).get(`/orders/${orderId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(orderId);
    });

    it("should return 404 for non-existing order", async () => {
        const res = await request(app).get(`/orders/999`);
        expect(res.status).toBe(404);
    });

    it("should delete an order", async () => {
        const res = await request(app).delete(`/orders/${orderId}`);
        expect(res.status).toBe(204);
    });
});
