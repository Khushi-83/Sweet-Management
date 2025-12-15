it("should login an existing user with correct credentials", async () => {
  await request(app).post("/api/auth/register").send({
    email: "login@test.com",
    password: "secret123",
  });

  const res = await request(app).post("/api/auth/login").send({
    email: "login@test.com",
    password: "secret123",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("token");
});

it("should reject login with wrong password", async () => {
  const res = await request(app).post("/api/auth/login").send({
    email: "login@test.com",
    password: "wrongpass",
  });

  expect(res.statusCode).toBe(401);
});
