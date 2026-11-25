import { NavLink, Outlet } from "react-router-dom";
import { useDonations } from "../context/DonationContext.jsx";

const links = [
  { to: "/doacoes", label: "Encontrar alimentos" },
  { to: "/doacoes/nova", label: "Oferecer alimento" },
  { to: "/impacto", label: "Impacto" },
  { to: "/historico", label: "Histórico" },
];

export default function AppShell() {
  const { storageError, ready } = useDonations();

  return (
    <div className="min-h-screen">
      <header className="site-header">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-4 py-4">
          <NavLink className="brand" to="/" aria-label="Mesa Circular, início">
            <span className="brand-mark" aria-hidden="true">MC</span>
            <span>Mesa Circular</span>
          </NavLink>
          <nav className="main-nav" aria-label="Navegação principal">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink className="nav-link" to="/cadastro">Cadastro</NavLink>
          </nav>
        </div>
      </header>
      <main className="page-wrap min-h-[70vh] py-8 sm:py-12">
        {!ready && <p className="notice" role="status">Carregando os dados deste navegador…</p>}
        {storageError && (
          <p className="notice notice-error mb-6" role="alert">
            {storageError} Confira o armazenamento local do navegador antes de continuar.
          </p>
        )}
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="page-wrap flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p>Mesa Circular — protótipo acadêmico com dados fictícios.</p>
          <p>ODS 2 · Fome Zero e Agricultura Sustentável | ODS 12 · Consumo e Produção Responsáveis</p>
        </div>
      </footer>
    </div>
  );
}
