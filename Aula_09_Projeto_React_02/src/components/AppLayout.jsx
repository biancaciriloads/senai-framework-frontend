import { Link, NavLink, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Descobertas, início">
          <span className="brand-mark" aria-hidden="true">d.</span>
          <span>descobertas</span>
        </Link>
        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/" end>Explorar</NavLink>
          <a href="https://jsonplaceholder.typicode.com/posts" target="_blank" rel="noreferrer">
            API <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <a className="header-action" href="#nova-publicacao">
          <span aria-hidden="true">＋</span> Compartilhar ideia
        </a>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <Link className="footer-brand" to="/">descobertas.</Link>
        <p>Ideias interessantes merecem ser compartilhadas.</p>
        <span className="footer-note">PROJETO ACADÊMICO · REACT</span>
      </footer>
    </div>
  );
}
