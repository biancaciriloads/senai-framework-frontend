import assert from "node:assert/strict";
import test from "node:test";
import { readList, writeList } from "./storage.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("reads an empty list for a missing key and persists list values", () => {
  const storage = createStorage();
  assert.deepEqual(readList(storage, "items"), []);
  writeList(storage, "items", [{ id: "one" }]);
  assert.deepEqual(readList(storage, "items"), [{ id: "one" }]);
});

test("rejects malformed or non-list stored values and non-list writes", () => {
  assert.throws(() => readList(createStorage({ items: "{" }), "items"), /não são JSON válido/);
  assert.throws(() => readList(createStorage({ items: "{}" }), "items"), /devem ser uma lista/);
  assert.throws(() => writeList(createStorage(), "items", {}), /Só é possível salvar listas/);
});
