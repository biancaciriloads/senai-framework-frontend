import { useDonations } from "../context/DonationContext.jsx";
import { formatDate, statusLabels } from "../lib/donations.js";

export default function HistoryPage() {
  const { donations } = useDonations();
  const ordered = [...donations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <section>
      <p className="eyebrow">Registro local</p>
      <h1>Histórico de ofertas</h1>
      <p className="helper-text mt-2">Este histórico fica apenas no armazenamento deste navegador.</p>
      {ordered.length === 0 ? (
        <p className="empty-state mt-6">Ainda não há ofertas registradas.</p>
      ) : (
        <div className="table-scroll mt-6">
          <table>
            <thead>
              <tr><th>Alimento</th><th>Categoria</th><th>Quantidade</th><th>Doador</th><th>Validade</th><th>Status</th></tr>
            </thead>
            <tbody>
              {ordered.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.food}</td>
                  <td>{donation.category}</td>
                  <td>{donation.quantityKg} kg</td>
                  <td>{donation.donor}</td>
                  <td>{formatDate(donation.expiresOn)}</td>
                  <td>{statusLabels[donation.status] ?? "Desconhecido"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
