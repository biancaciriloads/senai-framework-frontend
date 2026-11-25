export const storageKeys = {
  donations: "mesa-circular:doacoes:v1",
  users: "mesa-circular:usuarios:v1",
};

export function readList(storage, key) {
  const raw = storage.getItem(key);
  if (raw === null) return [];

  let value;
  try {
    value = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Os dados locais de "${key}" não são JSON válido.`, { cause: error });
  }

  if (!Array.isArray(value)) {
    throw new Error(`Os dados locais de "${key}" devem ser uma lista.`);
  }

  return value;
}

export function writeList(storage, key, value) {
  if (!Array.isArray(value)) {
    throw new TypeError("Só é possível salvar listas neste armazenamento.");
  }

  storage.setItem(key, JSON.stringify(value));
}
