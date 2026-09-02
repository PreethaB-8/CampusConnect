const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../src/app");

test("GET / should return CampusConnect welcome message", async () => {
  const response = await request(app).get("/");

  assert.strictEqual(response.status, 200);
  assert.strictEqual(
    response.body.message,
    "Welcome to CampusConnect Digital Notice Board"
  );
});

test("GET /health should return healthy status", async () => {
  const response = await request(app).get("/health");

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.status, "healthy");
});

test("GET /notices should return the notice list", async () => {
  const response = await request(app).get("/notices");

  assert.strictEqual(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length >= 2);
});