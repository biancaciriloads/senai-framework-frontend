import assert from "node:assert/strict";
import test from "node:test";
import {
  collectDonation,
  filterDonations,
  getImpactMetrics,
  reserveDonation,
  validateDonation,
} from "./donations.js";

const validDonation = {
  food: "Tomates",
  category: "Frutas e verduras",
  quantityKg: "2.5",
  expiresOn: "2026-07-10",
  pickupWindow: "Hoje, 16h–18h",
  donor: "Horta comunitária",
  pickupArea: "Centro",
};

test("validates the required donation fields and rejects past expiry", () => {
  assert.deepEqual(validateDonation(validDonation, "2026-07-01"), {});
  assert.equal(validateDonation({ ...validDonation, food: " " }).food, "Informe o alimento.");
  assert.equal(
    validateDonation({ ...validDonation, expiresOn: "2026-06-30" }, "2026-07-01").expiresOn,
    "A validade não pode estar no passado.",
  );
});

test("filters by normalized query, status, and category without changing the source", () => {
  const donations = [
    { food: "Tomates", donor: "Horta", pickupArea: "Centro", status: "disponivel", category: "Frutas e verduras" },
    { food: "Pães", donor: "Padaria", pickupArea: "Norte", status: "reservada", category: "Padaria" },
  ];

  assert.deepEqual(
    filterDonations(donations, { query: "  HORTA ", status: "disponivel", category: "Frutas e verduras" }),
    [donations[0]],
  );
  assert.equal(donations.length, 2);
});

test("allows only valid reserve and collection transitions", () => {
  const donation = { ...validDonation, status: "disponivel" };
  const reserved = reserveDonation(donation, "Coletor");
  assert.equal(reserved.status, "reservada");
  assert.equal(reserved.collector, "Coletor");
  assert.throws(() => reserveDonation(reserved, "Outra pessoa"), /Somente doações disponíveis/);

  const collected = collectDonation(reserved, "2026-07-01T10:00:00.000Z");
  assert.equal(collected.status, "coletada");
  assert.equal(collected.collectedAt, "2026-07-01T10:00:00.000Z");
  assert.throws(() => collectDonation(donation), /Somente doações reservadas/);
});

test("calculates impact from collected donations only", () => {
  const metrics = getImpactMetrics([
    { status: "coletada", quantityKg: 2.5 },
    { status: "disponivel", quantityKg: 8 },
    { status: "coletada", quantityKg: 1 },
  ]);

  assert.deepEqual(metrics, {
    collectedCount: 2,
    kilograms: 3.5,
    estimatedMeals: 7,
    availableCount: 1,
  });
});
