function dateAfter(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export const sampleDonations = [
  {
    id: "sample-vegetables",
    food: "Caixas de legumes da estação",
    category: "Frutas e verduras",
    quantityKg: 12,
    expiresOn: dateAfter(2),
    pickupWindow: "Hoje, 16h–18h",
    donor: "Horta do Bairro",
    pickupArea: "Centro",
    notes: "Abobrinha, cenoura e tomate. Levar caixas reutilizáveis.",
    status: "disponivel",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-bread",
    food: "Pães do dia",
    category: "Padaria",
    quantityKg: 5,
    expiresOn: dateAfter(1),
    pickupWindow: "Hoje, 19h–20h",
    donor: "Padaria Ponto Quente",
    pickupArea: "Vila Nova",
    notes: "Pães variados, embalados em sacos de papel.",
    status: "disponivel",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-meals",
    food: "Refeições vegetarianas",
    category: "Refeições prontas",
    quantityKg: 8,
    expiresOn: dateAfter(1),
    pickupWindow: "Amanhã, 11h–12h",
    donor: "Cozinha Semente",
    pickupArea: "Jardim Sul",
    notes: "Porções refrigeradas; confirmar transporte térmico.",
    status: "reservada",
    collector: "Coletivo Raiz",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-grains",
    food: "Grãos e farinha",
    category: "Não perecíveis",
    quantityKg: 20,
    expiresOn: dateAfter(30),
    pickupWindow: "Seg–Sex, 9h–16h",
    donor: "Mercado Comunitário",
    pickupArea: "Estação",
    notes: "Embalagens fechadas e dentro da validade.",
    status: "coletada",
    collector: "Rede Apoio",
    createdAt: new Date().toISOString(),
    collectedAt: new Date().toISOString(),
  },
];
