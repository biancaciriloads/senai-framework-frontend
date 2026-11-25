import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DonationCard from "../components/DonationCard.jsx";
import { useDonations } from "../context/DonationContext.jsx";
import { categories, filterDonations } from "../lib/donations.js";

export default function DonationsPage() {
  const { donations, loadSamples, ready } = useDonations();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("todos");
  const [category, setCategory] = useState("todas");
  const [message, setMessage] = useState("");

  const visibleDonations = useMemo(
    () => filterDonations(donations, { query, status, category }),
    [category, donations, query, status],
  );

  function addSamples() {
    try {
      loadSamples();
      setMessage("Os exemplos fictícios foram adicionados.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Vitrine comunitária</p>
          <h1>Doações de alimentos</h1>
          <p className="helper-text mt-2">Combine a retirada diretamente com o doador. Use apenas dados fictícios neste protótipo.</p>
        </div>
        <Link className="button button-primary" to="/doacoes/nova">Publicar doação</Link>
      </div>

      <div className="filter-panel mt-7">
        <label className="field">
          <span>Buscar por alimento, doador ou região</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: legumes, mercado, Centro" />
        </label>
        <label className="field">
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="todos">Todos</option>
            <option value="disponivel">Disponíveis</option>
            <option value="reservada">Reservadas</option>
            <option value="coletada">Coletadas</option>
          </select>
        </label>
        <label className="field">
          <span>Categoria</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="todas">Todas</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="helper-text" role="status">{message || `${visibleDonations.length} resultado(s)`}</p>
        <button className="text-link" type="button" onClick={addSamples}>Carregar doações de exemplo</button>
      </div>

      {!ready ? <p className="empty-state mt-5">Carregando doações…</p> : null}
      {ready && visibleDonations.length === 0 && (
        <p className="empty-state mt-5">Nenhuma doação corresponde aos filtros. Tente alterar a busca ou carregue exemplos fictícios.</p>
      )}
      <div className="donation-grid mt-5">
        {visibleDonations.map((donation) => <DonationCard key={donation.id} donation={donation} />)}
      </div>
    </section>
  );
}
