export default function GameCard({ game, isFavorite, onToggleFavorite }) {
  return (
    <article className="game-card">
      <div
        className={`game-cover ${game.artwork}`}
        role="img"
        aria-label={`Arte ilustrativa de ${game.title}`}
      >
        <span className="cover-kicker">{game.studio}</span>
        <span className="cover-emoji" aria-hidden="true">{game.emoji}</span>
        <span className="cover-title">{game.coverTitle}</span>
        <button
          className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
          type="button"
          aria-label={isFavorite ? `Remover ${game.title} dos favoritos` : `Adicionar ${game.title} aos favoritos`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(game.id)}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="game-info">
        <div className="game-meta">
          <span>{game.category}</span>
          <span>{game.year}</span>
        </div>
        <div className="game-title-row">
          <h3>{game.title}</h3>
          <span className="game-rating" aria-label={`Nota ${game.rating} de 10`}>
            <span aria-hidden="true">★</span> {game.rating}
          </span>
        </div>
        <p>{game.description}</p>
      </div>
    </article>
  );
}
