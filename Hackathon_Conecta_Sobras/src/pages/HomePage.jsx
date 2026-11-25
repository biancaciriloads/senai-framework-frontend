import { Link } from "react-router-dom";
import { useDonations } from "../context/DonationContext.jsx";
import { getImpactMetrics } from "../lib/donations.js";

export default function HomePage() {
  const { donations } = useDonations();
  const impact = getImpactMetrics(donations);

  return (
    <div className="space-y-12">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">ODS 2 · ODS 12</p>
          <h1>Alimento bom merece chegar à mesa, não ao descarte.</h1>
          <p className="hero-intro">
            Uma vitrine comunitária para aproximar quem tem excedentes de alimentos
            de quem pode coletar e compartilhar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="button button-primary" to="/doacoes">Encontrar doações</Link>
            <Link className="button button-secondary" to="/doacoes/nova">Oferecer alimento</Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Ilustração de alimentos frescos">
          <span aria-hidden="true">🥬</span>
          <span aria-hidden="true">🍊</span>
          <span aria-hidden="true">🍞</span>
          <p>Partilha local,<br />impacto coletivo.</p>
        </div>
      </section>

      <section aria-labelledby="impact-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Impacto acompanhado</p>
            <h2 id="impact-title">Cada coleta conta</h2>
          </div>
          <Link className="text-link" to="/impacto">Ver painel de impacto →</Link>
        </div>
        <div className="metric-grid">
          <article className="metric-card"><strong>{impact.kilograms} kg</strong><span>registrados como coletados</span></article>
          <article className="metric-card"><strong>{impact.estimatedMeals}</strong><span>refeições estimadas*</span></article>
          <article className="metric-card"><strong>{impact.availableCount}</strong><span>doações disponíveis</span></article>
        </div>
        <p className="helper-text mt-3">*Estimativa demonstrativa: 2 refeições por kg coletado.</p>
      </section>

      <section className="info-panel">
        <div>
          <p className="eyebrow">Como funciona</p>
          <h2>Três passos para circular melhor os alimentos</h2>
        </div>
        <ol className="steps-grid">
          <li><span>01</span><strong>Publique</strong><p>Descreva o alimento, a quantidade e a janela de retirada.</p></li>
          <li><span>02</span><strong>Combine</strong><p>Um coletor encontra a oferta e reserva o que pode aproveitar.</p></li>
          <li><span>03</span><strong>Confirme</strong><p>Marque a coleta para atualizar o histórico e os indicadores.</p></li>
        </ol>
      </section>
    </div>
  );
}
