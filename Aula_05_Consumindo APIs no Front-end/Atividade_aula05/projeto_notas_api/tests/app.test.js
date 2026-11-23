import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, test } from 'node:test';
import { createApp } from '../src/app.js';

let server;
let dataDirectory;
let baseUrl;

beforeEach(async () => {
  dataDirectory = await mkdtemp(join(tmpdir(), 'projeto-notas-'));
  server = createApp({
    dataFilePath: join(dataDirectory, 'notes.json'),
    allowedOrigins: ['http://localhost:5173'],
  }).listen(0, '127.0.0.1');

  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterEach(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  await rm(dataDirectory, { recursive: true, force: true });
});

async function request(path, options) {
  return fetch(`${baseUrl}${path}`, options);
}

function jsonBody(value) {
  return {
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(value),
  };
}

test('health endpoint reports that the API is available', async () => {
  const response = await request('/health');

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('CRUD routes create, list, read, update, and delete notes', async () => {
  const emptyList = await request('/api/notes');
  assert.deepEqual(await emptyList.json(), []);

  const createdResponse = await request('/api/notes', {
    method: 'POST',
    ...jsonBody({ titulo: '  Aula  ', texto: '  Revisar Express  ' }),
  });
  assert.equal(createdResponse.status, 201);
  const created = await createdResponse.json();
  assert.equal(created.titulo, 'Aula');
  assert.equal(created.texto, 'Revisar Express');
  assert.ok(created.id);
  assert.ok(created.criadoEm);

  const listed = await request('/api/notes');
  assert.deepEqual(await listed.json(), [created]);

  const fetched = await request(`/api/notes/${created.id}`);
  assert.deepEqual(await fetched.json(), created);

  const updatedResponse = await request(`/api/notes/${created.id}`, {
    method: 'PUT',
    ...jsonBody({ titulo: 'Aula atualizada', texto: 'Revisar rotas' }),
  });
  assert.equal(updatedResponse.status, 200);
  const updated = await updatedResponse.json();
  assert.equal(updated.id, created.id);
  assert.equal(updated.titulo, 'Aula atualizada');
  assert.ok(updated.atualizadoEm);

  const deletedResponse = await request(`/api/notes/${created.id}`, {
    method: 'DELETE',
  });
  assert.equal(deletedResponse.status, 200);
  assert.deepEqual(await deletedResponse.json(), { mensagem: 'Nota removida.' });

  const finalList = await request('/api/notes');
  assert.deepEqual(await finalList.json(), []);
});

test('create and update reject missing or empty note fields', async () => {
  for (const [method, path] of [
    ['POST', '/api/notes'],
    ['PUT', '/api/notes/any-id'],
  ]) {
    const response = await request(path, {
      method,
      ...jsonBody({ titulo: ' ', texto: '' }),
    });
    assert.equal(response.status, 400);
    assert.match((await response.json()).erro, /título/);
  }
});

test('read, update, and delete return 404 for an unknown note', async () => {
  for (const [method, path] of [
    ['GET', '/api/notes/unknown'],
    ['PUT', '/api/notes/unknown'],
    ['DELETE', '/api/notes/unknown'],
  ]) {
    const response = await request(path, {
      method,
      ...(method === 'PUT' ? jsonBody({ titulo: 'A', texto: 'B' }) : {}),
    });
    assert.equal(response.status, 404);
  }
});

test('malformed JSON receives a client error', async () => {
  const response = await request('/api/notes', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{',
  });

  assert.equal(response.status, 400);
  assert.match((await response.json()).erro, /JSON válido/);
});

test('CORS allows the configured front-end origin only', async () => {
  const allowed = await request('/health', {
    headers: { origin: 'http://localhost:5173' },
  });
  assert.equal(allowed.headers.get('access-control-allow-origin'), 'http://localhost:5173');

  const rejected = await request('/health', {
    headers: { origin: 'https://unexpected.example' },
  });
  assert.equal(rejected.headers.get('access-control-allow-origin'), null);
});

test('mutations are persisted between API instances', async () => {
  const createdResponse = await request('/api/notes', {
    method: 'POST',
    ...jsonBody({ titulo: 'Persistência', texto: 'Arquivo local' }),
  });
  const created = await createdResponse.json();

  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  server = createApp({
    dataFilePath: join(dataDirectory, 'notes.json'),
    allowedOrigins: ['http://localhost:5173'],
  }).listen(0, '127.0.0.1');
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;

  const restored = await request('/api/notes');
  assert.deepEqual(await restored.json(), [created]);
});
