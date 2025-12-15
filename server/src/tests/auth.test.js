const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

describe("Auth: Register", () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  it("should register a new user with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should not allow duplicate email registration", async () => {
    await request(app).post("/api/auth/register").send({
      email: "dup@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/register").send({
      email: "dup@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
  });
});
