import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="section-kicker">ERRO 404</p>
      <h1>Essa ideia se perdeu pelo caminho.</h1>
      <Link className="hero-link" to="/">Voltar ao mural <span aria-hidden="true">↗</span></Link>
    </section>
  );
}
