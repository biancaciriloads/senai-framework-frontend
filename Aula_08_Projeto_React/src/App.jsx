import { useMemo, useState } from 'react';
import CategoryFilter from './components/CategoryFilter.jsx';
import GameCard from './components/GameCard.jsx';
import { games } from './data/games.js';

const categories = ['Todos', 'Aventura', 'Puzzle', 'RPG', 'Favoritos'];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);

  const visibleGames = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('pt-BR');

    return games.filter((game) => {
      const matchesCategory = activeCategory === 'Todos'
        || (activeCategory === 'Favoritos'
          ? favoriteIds.includes(game.id)
          : game.category === activeCategory);
      const matchesSearch = `${game.title} ${game.category} ${game.description}`
        .toLocaleLowerCase('pt-BR')
        .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, favoriteIds, searchTerm]);

  function toggleFavorite(gameId) {
    setFavoriteIds((currentIds) => (
      currentIds.includes(gameId)
        ? currentIds.filter((id) => id !== gameId)
        : [...currentIds, gameId]
    ));
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="PixelPlay, início">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>pixel<span>play</span></span>
        </a>
        <p className="header-note">Descubra seu próximo jogo favorito</p>
        <a className="header-link" href="#biblioteca">Biblioteca <span aria-hidden="true">↗</span></a>
      </header>

      <main id="inicio">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true">✦</span> SUA PRÓXIMA AVENTURA COMEÇA AQUI</p>
            <h1 id="hero-title">Grandes mundos.<br /><span>Pequenos estúdios.</span></h1>
            <p className="hero-description">
              Uma seleção de jogos independentes para quem gosta de explorar,
              resolver e se surpreender.
            </p>
            <a className="primary-link" href="#biblioteca">Explorar biblioteca <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-art" aria-label="Ilustração de uma montanha ao pôr do sol" role="img">
            <span className="hero-sun" />
            <span className="hero-mountain hero-mountain-back" />
            <span className="hero-mountain hero-mountain-front" />
            <span className="hero-art-label">INDIE WORLDS<br />VOL. 01</span>
          </div>
        </section>

        <section className="library-section" id="biblioteca" aria-labelledby="library-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CATÁLOGO CURADO</p>
              <h2 id="library-title">Encontre seu próximo mundo</h2>
            </div>
            <p className="game-count">
              <strong>{visibleGames.length.toString().padStart(2, '0')}</strong>
              <span>jogos encontrados</span>
            </p>
          </div>

          <div className="library-controls">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
            <label className="search-field">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <span className="sr-only">Buscar jogos</span>
              <input
                type="search"
                placeholder="Buscar por título ou gênero"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <kbd>/</kbd>
            </label>
          </div>

          {visibleGames.length > 0 ? (
            <div className="game-grid">
              {visibleGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={favoriteIds.includes(game.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <span aria-hidden="true">⌕</span>
              <h3>Nenhum jogo encontrado</h3>
              <p>Tente outro termo ou escolha uma categoria diferente.</p>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('Todos');
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand-small" href="#inicio">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>pixel<span>play</span></span>
        </a>
        <p>Uma homenagem aos mundos feitos com imaginação.</p>
        <span className="footer-credit">PROJETO ACADÊMICO · REACT</span>
      </footer>
    </div>
  );
}
