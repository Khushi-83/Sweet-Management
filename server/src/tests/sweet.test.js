it("should reduce quantity when sweet is purchased", async () => {
  const sweet = await Sweet.create({
    name: "Barfi",
    category: "Indian",
    price: 20,
    quantity: 3,
  });

  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/purchase`)
    .set("Authorization", `Bearer ${userToken}`);

  expect(res.body.quantity).toBe(2);
});

it("should not allow purchase if quantity is zero", async () => {
  const sweet = await Sweet.create({
    name: "Halwa",
    category: "Indian",
    price: 30,
    quantity: 0,
  });

  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/purchase`)
    .set("Authorization", `Bearer ${userToken}`);

  expect(res.statusCode).toBe(400);
});
