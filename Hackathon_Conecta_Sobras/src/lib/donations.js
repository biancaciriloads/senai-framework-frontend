export const categories = [
  "Frutas e verduras",
  "Padaria",
  "Refeições prontas",
  "Não perecíveis",
  "Bebidas",
];

export const statusLabels = {
  disponivel: "Disponível",
  reservada: "Reservada",
  coletada: "Coletada",
};

export function localDateString(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function validateDonation(form, today = localDateString()) {
  const errors = {};

  if (!form.food?.trim()) errors.food = "Informe o alimento.";
  if (!categories.includes(form.category)) errors.category = "Escolha uma categoria.";
  if (!Number.isFinite(Number(form.quantityKg)) || Number(form.quantityKg) <= 0) {
    errors.quantityKg = "Informe uma quantidade maior que zero.";
  }
  if (!form.expiresOn) errors.expiresOn = "Informe a validade.";
  else if (form.expiresOn < today) errors.expiresOn = "A validade não pode estar no passado.";
  if (!form.pickupWindow?.trim()) errors.pickupWindow = "Informe o período de retirada.";
  if (!form.donor?.trim()) errors.donor = "Informe quem está doando.";
  if (!form.pickupArea?.trim()) errors.pickupArea = "Informe a região de retirada.";

  return errors;
}

export function filterDonations(donations, { query = "", status = "todos", category = "todas" } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

  return donations.filter((donation) => {
    const matchesQuery =
      !normalizedQuery ||
      `${donation.food} ${donation.donor} ${donation.pickupArea}`
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedQuery);
    const matchesStatus = status === "todos" || donation.status === status;
    const matchesCategory = category === "todas" || donation.category === category;
    return matchesQuery && matchesStatus && matchesCategory;
  });
}

export function reserveDonation(donation, collector) {
  if (donation.status !== "disponivel") {
    throw new Error("Somente doações disponíveis podem ser reservadas.");
  }

  return { ...donation, status: "reservada", collector };
}

export function collectDonation(donation, collectedAt = new Date().toISOString()) {
  if (donation.status !== "reservada") {
    throw new Error("Somente doações reservadas podem ser marcadas como coletadas.");
  }

  return { ...donation, status: "coletada", collectedAt };
}

export function getImpactMetrics(donations) {
  const collected = donations.filter((donation) => donation.status === "coletada");
  const kilograms = collected.reduce(
    (total, donation) => total + (Number(donation.quantityKg) || 0),
    0,
  );

  return {
    collectedCount: collected.length,
    kilograms,
    estimatedMeals: Math.round(kilograms * 2),
    availableCount: donations.filter((donation) => donation.status === "disponivel").length,
  };
}

export function formatDate(value) {
  if (!value) return "Não informado";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
}
