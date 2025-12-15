it("should allow admin to create a sweet", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Ladoo",
      category: "Indian",
      price: 10,
      quantity: 50,
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe("Ladoo");
});
