import { Link } from "react-router-dom";
import { formatDate, statusLabels } from "../lib/donations.js";

const statusClass = {
  disponivel: "status status-available",
  reservada: "status status-reserved",
  coletada: "status status-collected",
};

export default function DonationCard({ donation }) {
  return (
    <article className="donation-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{donation.category}</p>
          <h2 className="mt-1 text-xl font-bold text-stone-900">{donation.food}</h2>
        </div>
        <span className={statusClass[donation.status] ?? "status"}>
          {statusLabels[donation.status] ?? "Status desconhecido"}
        </span>
      </div>
      <dl className="card-details mt-5">
        <div><dt>Quantidade</dt><dd>{donation.quantityKg} kg</dd></div>
        <div><dt>Retirada</dt><dd>{donation.pickupWindow}</dd></div>
        <div><dt>Região</dt><dd>{donation.pickupArea}</dd></div>
        <div><dt>Validade</dt><dd>{formatDate(donation.expiresOn)}</dd></div>
      </dl>
      <Link className="text-link mt-5 inline-flex" to={`/doacoes/${donation.id}`}>
        Ver detalhes <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
