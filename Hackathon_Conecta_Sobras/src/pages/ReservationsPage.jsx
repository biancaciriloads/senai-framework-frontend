import { useState } from "react";
import { Link } from "react-router-dom";
import { useDonations } from "../context/DonationContext.jsx";
import { formatDate } from "../lib/donations.js";

export default function ReservationsPage() {
  const { donations, collect } = useDonations();
  const [message, setMessage] = useState("");
  const reserved = donations.filter((donation) => donation.status === "reservada");

  function confirmCollection(id) {
    if (!window.confirm("Confirma que esta doação foi coletada?")) return;
    try {
      collect(id);
      setMessage("Coleta registrada no histórico.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section>
      <p className="eyebrow">Acompanhamento</p>
      <h1>Reservas</h1>
      <p className="helper-text mt-2">Confirme a coleta somente depois que ela acontecer.</p>
      {message && <p className="notice mt-5" role="status">{message}</p>}
      {reserved.length === 0 ? (
        <div className="empty-state mt-6">
          <p>Não há doações reservadas.</p>
          <Link className="text-link mt-3 inline-flex" to="/doacoes">Ver ofertas disponíveis</Link>
        </div>
      ) : (
        <div className="donation-grid mt-6">
          {reserved.map((donation) => (
            <article className="donation-card" key={donation.id}>
              <p className="eyebrow">{donation.category}</p>
              <h2 className="mt-1 text-xl font-bold">{donation.food}</h2>
              <p className="mt-3 text-stone-700">{donation.quantityKg} kg · retirada {donation.pickupWindow}</p>
              <p className="helper-text mt-2">Doador: {donation.donor} · validade {formatDate(donation.expiresOn)}</p>
              <button className="button button-primary mt-5" type="button" onClick={() => confirmCollection(donation.id)}>
                Marcar como coletada
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
