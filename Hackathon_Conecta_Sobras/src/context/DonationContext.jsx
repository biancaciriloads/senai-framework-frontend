import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { sampleDonations } from "../data/sampleDonations.js";
import { collectDonation, reserveDonation } from "../lib/donations.js";
import { readList, storageKeys, writeList } from "../lib/storage.js";

const DonationContext = createContext(null);

function messageFrom(error) {
  return error instanceof Error ? error.message : "O armazenamento local não pôde ser acessado.";
}

export function DonationProvider({ children }) {
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);
  const [storageError, setStorageError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setDonations(readList(window.localStorage, storageKeys.donations));
      setUsers(readList(window.localStorage, storageKeys.users));
    } catch (error) {
      setStorageError(messageFrom(error));
    } finally {
      setReady(true);
    }
  }, []);

  const persist = useCallback((key, value, setter) => {
    if (storageError) {
      throw new Error(`Não foi possível continuar: ${storageError}`);
    }

    try {
      writeList(window.localStorage, key, value);
      setter(value);
    } catch (error) {
      const message = `Não foi possível salvar no navegador: ${messageFrom(error)}`;
      setStorageError(message);
      throw new Error(message, { cause: error });
    }
  }, [storageError]);

  const addDonation = useCallback((fields) => {
    const donation = {
      ...fields,
      id: globalThis.crypto?.randomUUID?.() ?? `doacao-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      quantityKg: Number(fields.quantityKg),
      status: "disponivel",
      createdAt: new Date().toISOString(),
    };
    persist(storageKeys.donations, [...donations, donation], setDonations);
    return donation;
  }, [donations, persist]);

  const updateDonation = useCallback((id, transform) => {
    const current = donations.find((donation) => donation.id === id);
    if (!current) throw new Error("A doação não foi encontrada.");
    const updated = donations.map((donation) =>
      donation.id === id ? transform(donation) : donation,
    );
    persist(storageKeys.donations, updated, setDonations);
  }, [donations, persist]);

  const reserve = useCallback((id, collector = "Coletor visitante") => {
    updateDonation(id, (donation) => reserveDonation(donation, collector));
  }, [updateDonation]);

  const collect = useCallback((id) => {
    updateDonation(id, (donation) => collectDonation(donation));
  }, [updateDonation]);

  const loadSamples = useCallback(() => {
    const existingIds = new Set(donations.map((donation) => donation.id));
    const merged = [...donations, ...sampleDonations.filter((donation) => !existingIds.has(donation.id))];
    persist(storageKeys.donations, merged, setDonations);
  }, [donations, persist]);

  const registerUser = useCallback((user) => {
    const entry = {
      ...user,
      id: globalThis.crypto?.randomUUID?.() ?? `usuario-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    persist(storageKeys.users, [...users, entry], setUsers);
    return entry;
  }, [persist, users]);

  const value = useMemo(() => ({
    donations,
    users,
    ready,
    storageError,
    addDonation,
    reserve,
    collect,
    loadSamples,
    registerUser,
  }), [addDonation, collect, donations, loadSamples, ready, registerUser, reserve, storageError, users]);

  return <DonationContext.Provider value={value}>{children}</DonationContext.Provider>;
}

export function useDonations() {
  const context = useContext(DonationContext);
  if (!context) throw new Error("useDonations deve ser usado dentro de DonationProvider.");
  return context;
}
