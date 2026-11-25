import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="empty-state">
      <p className="eyebrow">404</p>
      <h1>Esta página não foi encontrada.</h1>
      <Link className="button button-primary mt-5" to="/">Voltar ao início</Link>
    </div>
  );
}
