import { useDonations } from "../context/DonationContext.jsx";
import { getImpactMetrics } from "../lib/donations.js";

export default function ImpactPage() {
  const { donations } = useDonations();
  const metrics = getImpactMetrics(donations);

  return (
    <section>
      <p className="eyebrow">ODS 2 · ODS 12</p>
      <h1>Painel de impacto</h1>
      <p className="helper-text mt-2">Indicadores calculados a partir das doações marcadas como coletadas neste navegador.</p>
      <div className="metric-grid mt-7">
        <article className="metric-card"><strong>{metrics.collectedCount}</strong><span>doações coletadas</span></article>
        <article className="metric-card"><strong>{metrics.kilograms} kg</strong><span>alimentos registrados</span></article>
        <article className="metric-card"><strong>{metrics.estimatedMeals}</strong><span>refeições estimadas</span></article>
        <article className="metric-card"><strong>{metrics.availableCount}</strong><span>ofertas disponíveis</span></article>
      </div>
      <p className="helper-text mt-4">A estimativa considera 2 refeições por kg; é ilustrativa e não representa medição nutricional.</p>
    </section>
  );
}
