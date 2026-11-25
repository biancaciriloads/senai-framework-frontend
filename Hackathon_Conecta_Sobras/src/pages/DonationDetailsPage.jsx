import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDonations } from "../context/DonationContext.jsx";
import { formatDate, statusLabels } from "../lib/donations.js";

export default function DonationDetailsPage() {
  const { donationId } = useParams();
  const navigate = useNavigate();
  const { donations, reserve } = useDonations();
  const donation = donations.find((item) => item.id === donationId);
  const [message, setMessage] = useState("");

  if (!donation) {
    return (
      <div className="empty-state">
        <h1>Oferta não encontrada</h1>
        <Link className="text-link mt-3 inline-flex" to="/doacoes">Voltar às doações</Link>
      </div>
    );
  }

  function makeReservation() {
    try {
      reserve(donation.id);
      setMessage("Reserva confirmada. Combine a retirada com o doador.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <article className="detail-panel">
      <Link className="text-link" to="/doacoes">← Todas as doações</Link>
      <p className="eyebrow mt-6">{donation.category}</p>
      <div className="section-heading mt-2">
        <div>
          <h1>{donation.food}</h1>
          <p className="helper-text mt-2">Oferecido por {donation.donor} · {donation.pickupArea}</p>
        </div>
        <span className="status">{statusLabels[donation.status] ?? "Status desconhecido"}</span>
      </div>
      <dl className="detail-grid mt-7">
        <div><dt>Quantidade</dt><dd>{donation.quantityKg} kg</dd></div>
        <div><dt>Validade</dt><dd>{formatDate(donation.expiresOn)}</dd></div>
        <div><dt>Retirada</dt><dd>{donation.pickupWindow}</dd></div>
        <div><dt>Região</dt><dd>{donation.pickupArea}</dd></div>
      </dl>
      <div className="mt-7">
        <h2 className="font-bold">Observações do doador</h2>
        <p className="mt-2 text-stone-700">{donation.notes || "Sem observações adicionais."}</p>
      </div>
      {message && <p className="notice mt-5" role="status">{message}</p>}
      {donation.status === "disponivel" ? (
        <button className="button button-primary mt-7" type="button" onClick={makeReservation}>Reservar doação</button>
      ) : (
        <button className="button button-secondary mt-7" type="button" onClick={() => navigate("/reservas")}>
          Ver reservas
        </button>
      )}
    </article>
  );
}
