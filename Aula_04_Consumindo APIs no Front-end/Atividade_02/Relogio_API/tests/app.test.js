import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { app } from "../app.js";

let server;
let baseUrl;

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("GET / returns the current date and time in São Paulo", async () => {
  const response = await fetch(`${baseUrl}/`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.timeZone, "America/Sao_Paulo");
  assert.equal(body.status, "API do relógio funcionando!");
  assert.match(body.dateTime, /^\d{4}-\d{2}-\d{2}T/);
  assert.match(body.date, /^\d{2}\/\d{2}\/\d{4}$/);
  assert.match(body.time, /^\d{2}:\d{2}:\d{2}$/);
});

test("GET /health reports that the API is available", async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("GET / allows the configured local frontend origin", async () => {
  const response = await fetch(`${baseUrl}/`, {
    headers: { Origin: "http://localhost:5173" },
  });

  assert.equal(response.headers.get("access-control-allow-origin"), "http://localhost:5173");
});
